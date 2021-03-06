// Internal Packages
import constants from '../constants'

/**
 * Sets the parsed properties to an object.
 *
 * @param {Array}  data  The data to use.
 * @param {string} props The properties to apply.
 * @returns {Object} An object.
 */
export default function objectSet(data, props) {
  const nextPropsArr = props.split(constants.PROP_DELIMITER)

  const [, prop, isArr] = constants.REGEX_PROP_IS_ARR_IS_OPT.exec(nextPropsArr.shift()) || []

  const nextProps = nextPropsArr.join(constants.PROP_DELIMITER)

  if (!prop) {
    return data
  }

  return {
    [prop]: isArr ? data.map(nextData => objectSet(nextData, nextProps)) : objectSet(data, nextProps),
  }
}
