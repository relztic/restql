import constants from '../constants'

export default function objectSet(
  data: unknown,
  props: string,
): Record<string, unknown> {
  const nextPropsArr = props.split(constants.PROP_DELIMITER)

  const [, prop, isArr] =
    constants.REGEX_PROP_IS_ARR_IS_OPT.exec(nextPropsArr.shift()!) || []

  const nextProps = nextPropsArr.join(constants.PROP_DELIMITER)

  if (!prop) {
    return data as Record<string, unknown>
  }

  return {
    [prop]: isArr
      ? (data as unknown[]).map((nextData) => objectSet(nextData, nextProps))
      : objectSet(data, nextProps),
  }
}
