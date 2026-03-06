import fetchResource from '../fetchResource'
import isObject from '../isObject'

const mockResponses: Record<string, unknown> = {
  'https://pokeapi.co/api/v2/pokemon/1/': {},
}

const mockFetch = (resource: string): Promise<object> =>
  new Promise((resolve) => {
    setTimeout(resolve, 100, mockResponses[resource])
  })

const globalFetch = global.fetch

describe('fetchResource', () => {
  beforeAll(() => {
    global.fetch = mockFetch as typeof global.fetch
  })

  afterAll(() => {
    global.fetch = globalFetch
  })

  it('should return an object on valid args', async () => {
    const resource = 'https://pokeapi.co/api/v2/pokemon/1/'

    const options = {}

    expect(isObject(await fetchResource(resource, options))).toBe(true)

    expect(isObject(fetchResource(resource, options))).toBe(true)
  })
})
