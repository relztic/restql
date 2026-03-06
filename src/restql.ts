import resolve from './resolve'
import type { Resolver } from './types'
import isObject from './utils/isObject'
import isResolver from './utils/isResolver'

export default async function restql<
  T extends object = Record<string, unknown>,
>(resource: string, resolver: Resolver, options: RequestInit = {}): Promise<T> {
  if (!isObject(resolver) || !isResolver(resolver)) {
    throw new Error(
      `InvalidArgumentError: invalid resolver \`${JSON.stringify(resolver)}\``,
    )
  }

  if (!isObject(options)) {
    throw new Error(
      `InvalidArgumentError: invalid options \`${JSON.stringify(options)}\``,
    )
  }

  return resolve(resource, resolver, options) as Promise<T>
}
