import objectGet from '../objectGet'

/**
 * @constant {Object} obj The object to use.
 */
// prettier-ignore
const obj = {
  a: [
    { b: [{ c: [1, -1] }, {}, { c: [3, -3] }] },
    {},
    { b: [{ c: [7, -7] }, {}, { c: [9, -9] }] },
  ],
}

describe('objectGet', () => {
  it('should return an array on valid args', () => {
    const props = 'a[].b[]?.c?'

    const received = objectGet(obj, props)

    // prettier-ignore
    const expected = [
      [[1, -1], null, [3, -3]],
      [],
      [[7, -7], null, [9, -9]],
    ]

    expect(received).toEqual(expected)
  })

  it('should throw an error on invalid args', () => {
    const props = 'a[].e[].c'

    const received = () => {
      objectGet(obj, props)
    }

    const expected = 'RuntimeError: could not get property `e`'

    expect(received).toThrow(expected)
  })
})
