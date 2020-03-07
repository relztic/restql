// Internal Packages
import constants from '../constants'

/**
 * Determines whether or not a resolver is valid.
 *
 * @param {Object} resolver The resolver to test.
 * @returns {boolean} Whether or not a resolver is valid.
 */
export default function isResolver(resolver) {
  if (!resolver) {
    return true
  }

  const keys = Object.keys(resolver)

  if (!keys.length) {
    return false
  }

  return keys
    .map(
      key =>
        !key.startsWith(constants.PROP_DELIMITER) &&
        !key.endsWith(constants.PROP_DELIMITER) &&
        isResolver(resolver[key])
    )
    .reduce((result, val) => result && val, true)
}
