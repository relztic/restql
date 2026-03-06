import constants from '../constants'

export default function objectGet(
  obj: Record<string, unknown>,
  props: string,
): unknown {
  const nextPropsArr = props.split(constants.PROP_DELIMITER)

  const [, prop, isArr, isOpt] =
    constants.REGEX_PROP_IS_ARR_IS_OPT.exec(nextPropsArr.shift()!) || []

  const nextProps = nextPropsArr.join(constants.PROP_DELIMITER)

  if (!prop) {
    return obj
  }

  if (!(prop in obj)) {
    if (isOpt) {
      return isArr ? [] : null
    }

    throw new Error(`RuntimeError: could not get property \`${prop}\``)
  }

  const nextObjs = obj[prop]

  return isArr
    ? (nextObjs as unknown[]).map((nextObj) =>
        objectGet(nextObj as Record<string, unknown>, nextProps),
      )
    : objectGet(nextObjs as Record<string, unknown>, nextProps)
}
