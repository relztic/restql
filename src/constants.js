/**
 * @constant {string} PROP_DELIMITER The delimiter of a property.
 */
const PROP_DELIMITER = '.'

/**
 * @constant {RegExp} REGEX_PROP_IS_ARR_IS_OPT Determines whether or not a property is an array and/or is optional.
 */
const REGEX_PROP_IS_ARR_IS_OPT = /^([^[\]?]+)(\[])?(\?)?$/

export default Object.freeze({
  PROP_DELIMITER,
  REGEX_PROP_IS_ARR_IS_OPT,
})
