import constants from '../constants'
import type { Resolver } from '../types'

export default function isResolver(resolver: Resolver | null): boolean {
  if (resolver === null) {
    return true
  }

  const keys = Object.keys(resolver)

  if (!keys.length) {
    return false
  }

  return keys
    .map(
      (key) =>
        !key.startsWith(constants.PROP_DELIMITER) &&
        !key.endsWith(constants.PROP_DELIMITER) &&
        isResolver(resolver[key]),
    )
    .reduce((result, val) => result && val, true)
}
