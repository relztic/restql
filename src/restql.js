// Internal packages.
import resolve from './resolve';
import isResolver from './utils/isResolver';

/**
 * Resolves the nested-linked resources of a RESTful API.
 *
 * @param {string} resource The resource to fetch.
 * @param {Object} resolver The resolver to apply.
 * @returns {Promise<Object>} A promise which resolves into an object.
 * @throws {InvalidArgumentError} If the resolver is invalid.
 */
export default async function restql(resource, resolver) {
  if (!isResolver(resolver)) {
    throw new Error(`InvalidArgumentError: \`resolver\` (${JSON.stringify(resolver)})`);
  }

  return resolve(resource, resolver);
}
