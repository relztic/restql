// External Packages
import isURL from 'validator/lib/isURL'

/**
 * Determines whether or not a resource is valid.
 *
 * @param {string} resource The resource to test.
 * @returns {boolean} Whether or not a resource is valid.
 */
export default function isResource(resource) {
  return isURL(resource)
}
