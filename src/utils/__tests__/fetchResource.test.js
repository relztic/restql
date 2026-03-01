import fetchResource from '../fetchResource'
import isObject from '../isObject'

jest.mock('axios')

describe('fetchResource', () => {
  it('should return an object on valid args', async () => {
    const resource = 'https://pokeapi.co/api/v2/pokemon/1/'

    const options = {}

    expect(isObject(await fetchResource(resource, options))).toBe(true)

    expect(isObject(fetchResource(resource, options))).toBe(true)
  })
})
