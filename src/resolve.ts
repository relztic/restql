import { merge } from 'es-toolkit'

import type { Resolver } from './types'
import fetchResource from './utils/fetchResource'
import isResource from './utils/isResource'
import objectGet from './utils/objectGet'
import objectSet from './utils/objectSet'

export default async function resolve(
  resource: string,
  resolver: Resolver | null,
  options: RequestInit,
): Promise<Record<string, unknown> | null> {
  if (!resource) {
    return null
  }

  if (!isResource(resource)) {
    throw new Error(`InvalidArgumentError: invalid resource \`${resource}\``)
  }

  const response = (await fetchResource(resource, options)).clone()

  if (!response.ok) {
    throw new Error(`RuntimeError: could not fetch resource \`${resource}\``)
  }

  const obj = await response.json()

  if (resolver === null) {
    return obj
  }

  const resourcesObj = Object.keys(resolver).map((props) => ({
    [props]: objectGet(obj, props),
  }))

  const resourcesArr = Object.entries(
    resourcesObj.reduce((result, val) => ({ ...result, ...val }), {}),
  )

  const responses = await Promise.all(
    resourcesArr.map(async ([props, resources]) => {
      const nextResolver = resolver[props]

      const data = Array.isArray(resources)
        ? await Promise.all(
            resources.map(async (nextResource: string) =>
              resolve(nextResource, nextResolver, options),
            ),
          )
        : await resolve(resources as string, nextResolver, options)

      return [props, data]
    }),
  )

  return responses.reduce(
    (result, [props, data]) => merge(result, objectSet(data, props as string)),
    obj,
  )
}
