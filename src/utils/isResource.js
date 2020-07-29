// External Packages
import validator from 'validator'

/**
 * @constant {Object} urlRegex The URL regex to test.
 */
const urlRegex = UrlRegex({ exact: true })

/**
 * Determines whether or not a resource is valid.
 *
 * @param {string} resource The resource to test.
 * @returns {boolean} Whether or not a resource is valid.
 */
export default function isResource(resource) {
  return validator.isURL(resource)
}
