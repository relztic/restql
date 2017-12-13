// Internal packages
import objectSet from '../objectSet'

describe('objectSet', () => {
  it('should return an object on valid args', () => {
    const data = [
      [[1, -1], [2, -2], [3, -3]],
      [[4, -4], [5, -5], [6, -6]],
      [[7, -7], [8, -8], [9, -9]],
    ]

    const props = 'a[].b[].c'

    const received = objectSet(data, props)

    const expected = {
      a: [
        { b: [{ c: [1, -1] }, { c: [2, -2] }, { c: [3, -3] }] },
        { b: [{ c: [4, -4] }, { c: [5, -5] }, { c: [6, -6] }] },
        { b: [{ c: [7, -7] }, { c: [8, -8] }, { c: [9, -9] }] },
      ],
    }

    expect(received).toEqual(expected)
  })
})
