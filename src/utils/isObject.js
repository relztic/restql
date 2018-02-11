/**
 * Determines whether or not an object is valid.
 *
 * @param {Object} obj The object to test.
 * @returns {boolean} Whether or not an object is valid.
 */
export default function isObject(obj) {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj)
}
