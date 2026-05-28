import fetchResource from '../fetchResource'

const mockedResponses: Record<string, object> = {
  'https://pokeapi.co/api/v2/pokemon/1': {},
  'https://pokeapi.co/api/v2/pokemon/2': {},
  'https://pokeapi.co/api/v2/pokemon/3': {},
}

const mockFetch = jest.fn(
  (resource: string): Promise<Response> =>
    Promise.resolve(
      new Response(JSON.stringify(mockedResponses[resource]), {
        headers: { 'Content-Type': 'application/json' },
      }),
    ),
)

describe('fetchResource', () => {
  const globalFetch = global.fetch

  beforeEach(() => {
    global.fetch = mockFetch as typeof global.fetch
  })

  afterEach(() => {
    global.fetch = globalFetch
    jest.clearAllMocks()
  })

  it('should retry failed requests', async () => {
    const resource: string = 'https://pokeapi.co/api/v2/pokemon/1'

    const options: RequestInit = {}

    mockFetch.mockRejectedValueOnce(new Error('NetworkError'))

    const firstResponse = fetchResource(resource, options)

    await expect(firstResponse).rejects.toThrow('NetworkError')

    const secondResponse = await fetchResource(resource, options)

    expect(global.fetch).toHaveBeenCalledTimes(2)
    expect(global.fetch).toHaveBeenNthCalledWith(1, resource, options)
    expect(global.fetch).toHaveBeenNthCalledWith(2, resource, options)
    expect(secondResponse.ok).toBe(true)
  })

  it('should not cache failed responses', async () => {
    const resource: string = 'https://pokeapi.co/api/v2/pokemon/2'

    const options: RequestInit = {}

    mockFetch.mockResolvedValueOnce(new Response(null, { status: 500 }))

    const firstResponse = await fetchResource(resource, options)
    const secondResponse = await fetchResource(resource, options)

    expect(global.fetch).toHaveBeenCalledTimes(2)
    expect(global.fetch).toHaveBeenNthCalledWith(1, resource, options)
    expect(global.fetch).toHaveBeenNthCalledWith(2, resource, options)
    expect(firstResponse.ok).toBe(false)
    expect(secondResponse.ok).toBe(true)
  })

  it('should cache successful responses', async () => {
    const resource: string = 'https://pokeapi.co/api/v2/pokemon/3'

    const options: RequestInit = {}

    const firstResponse = await fetchResource(resource, options)
    const secondResponse = await fetchResource(resource, options)

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenNthCalledWith(1, resource, options)
    expect(firstResponse).toEqual(secondResponse)
  })
})
