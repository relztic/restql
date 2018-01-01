// Internal packages
import constants from '../constants'

/**
 * Gets the parsed properties from an object.
 *
 * @param {Object} obj   The object to use.
 * @param {string} props The properties to apply.
 * @returns {Array} An array.
 * @throws {RuntimeError} If a property could not be got.
 */
export default function objectGet(obj, props) {
  const nextPropsArr = props.split(constants.PROP_DELIMITER)

  const [, prop, isArr, isOpt] = constants.REGEX_PROP_IS_ARR_IS_OPT.exec(nextPropsArr.shift()) || []

  const nextProps = nextPropsArr.join(constants.PROP_DELIMITER)

  if (!prop) {
    return obj
  }

  if (!(prop in obj)) {
    if (isOpt) {
      return (isArr)
        ? []
        : null
    }

    throw new Error(`RuntimeError: could not get property \`${prop}\``)
  }

  const nextObjs = obj[prop]

  return (isArr)
    ? nextObjs.map(nextObj => objectGet(nextObj, nextProps))
    : objectGet(nextObjs, nextProps)
}
