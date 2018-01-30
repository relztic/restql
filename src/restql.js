// Internal Packages
import resolve from './resolve'
import isObject from './utils/isObject'
import isResolver from './utils/isResolver'

/**
 * Resolves the nested-linked resources of a RESTful API.
 *
 * @param {string} resource  The resource to fetch.
 * @param {Object} resolver  The resolver to apply.
 * @param {Object} [options] The options to bypass.
 * @returns {Promise<Object>} A promise which resolves into an object.
 * @throws {InvalidArgumentError} If the resolver is invalid.
 * @throws {InvalidArgumentError} If the options is invalid.
 */
export default async function restql(resource, resolver, options = {}) {
  if (!isObject(resolver) || !isResolver(resolver)) {
    throw new Error(`InvalidArgumentError: invalid resolver \`${JSON.stringify(resolver)}\``)
  }

  if (!isObject(options)) {
    throw new Error(`InvalidArgumentError: invalid options \`${JSON.stringify(options)}\``)
  }

  return resolve(resource, resolver, options)
}
