// External packages
import __merge from 'lodash.merge'
import request from 'request-promise-native'

// Internal packages
import isResource from './utils/isResource'
import objectGet from './utils/objectGet'
import objectSet from './utils/objectSet'

/**
 * Resolves the nested-linked resources of a RESTful API.
 *
 * @param {string} resource The resource to fetch.
 * @param {Object} resolver The resolver to apply.
 * @param {Object} options  The options to bypass.
 * @returns {Promise<Object>} A promise which resolves into an object.
 * @throws {InvalidArgumentError} If a resource is invalid.
 * @throws {RuntimeError}         If a resource could not be fetched.
 */
export default async function resolve(resource, resolver, options) {
  if (!resource) {
    return null
  }

  if (!isResource(resource)) {
    throw new Error(`InvalidArgumentError: invalid resource \`${resource}\``)
  }

  const response = await request(resource, options)

  if (!response) {
    throw new Error(`RuntimeError: could not fetch resource \`${resource}\``)
  }

  const obj = JSON.parse(response)

  if (!resolver) {
    return obj
  }

  const resourcesObj = Object.keys(resolver).map(props => ({ [props]: objectGet(obj, props) }))

  const resourcesArr = Object.entries(resourcesObj.reduce((result, val) => ({ ...result, ...val }), {}))

  const responses = await Promise.all(resourcesArr.map(async ([props, resources]) => {
    const nextResolver = resolver[props]

    const data = (Array.isArray(resources))
      ? await Promise.all(resources.map(async nextResource => resolve(nextResource, nextResolver, options)))
      : await resolve(resources, nextResolver, options)

    return [props, data]
  }))

  return responses.reduce((result, [props, data]) => __merge(result, objectSet(data, props)), obj)
}
