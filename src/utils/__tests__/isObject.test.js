// Internal packages
import isObject from '../isObject'

describe('isObject', () => {
  it('should return `true` on valid objects', () => {
    const obj = {}

    expect(isObject(obj)).toBe(true)
  })

  it('should return `false` on invalid objects', () => {
    expect(isObject(undefined)).toBe(false)

    expect(isObject(null)).toBe(false)

    expect(isObject(false)).toBe(false)

    expect(isObject(0)).toBe(false)

    expect(isObject('')).toBe(false)

    expect(isObject(Symbol(''))).toBe(false)

    expect(isObject(() => {})).toBe(false)

    expect(isObject([])).toBe(false)
  })
})
