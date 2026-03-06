const PROP_DELIMITER: string = '.'

const REGEX_PROP_IS_ARR_IS_OPT: RegExp = /^([^[\]?]+)(\[])?(\?)?$/

const constants = Object.freeze({
  PROP_DELIMITER,
  REGEX_PROP_IS_ARR_IS_OPT,
})

export default constants
