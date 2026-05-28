import restql from '../restql'
import type { Resolver } from '../types'

const mockResponse = (body: Record<string, unknown>, ok = true): Response =>
  ({
    ok,
    clone: () => mockResponse(body, ok),
    json: async () => body,
  }) as Response

describe('restql', () => {
  const globalFetch = global.fetch

  afterEach(() => {
    global.fetch = globalFetch
    jest.clearAllMocks()
  })

  it('should throw an error on invalid resolvers', async () => {
    const resource: string = 'https://pokeapi.co/api/v2/pokemon/1'

    const resolver: Resolver = {}

    await expect(restql(resource, resolver)).rejects.toThrow(
      'InvalidArgumentError: invalid resolver `{}`',
    )
  })

  it('should throw an error on invalid options', async () => {
    const resource: string = 'https://pokeapi.co/api/v2/pokemon/1'

    const resolver: Resolver = {
      'abilities[].ability.url': null,
    }

    const options = null as unknown as RequestInit

    await expect(restql(resource, resolver, options)).rejects.toThrow(
      'InvalidArgumentError: invalid options `null`',
    )
  })

  it('should throw an error on invalid resources', async () => {
    const pokemonResource: string = 'https://pokeapi.co/api/v2/pokemon/1'
    const invalidResource: string =
      'https:// invalid.pokeapi.co/api/v2/ability/65'

    const resolver: Resolver = {
      'abilities[].ability.url': null,
    }

    const options: RequestInit = {
      headers: { Authorization: 'Bearer token', 'X-Cache-Control': 'v1' },
    }

    global.fetch = jest.fn(
      (nextResource: string, nextOptions?: RequestInit): Promise<Response> => {
        expect(nextOptions).toBe(options)

        if (nextResource === pokemonResource) {
          return Promise.resolve(
            mockResponse({
              id: 1,
              abilities: [
                {
                  ability: {
                    name: 'overgrow',
                    url: invalidResource,
                  },
                },
              ],
            }),
          )
        }

        return Promise.resolve(mockResponse({}))
      },
    ) as typeof global.fetch

    await expect(restql(pokemonResource, resolver, options)).rejects.toThrow(
      'InvalidArgumentError: invalid resource `https:// invalid.pokeapi.co/api/v2/ability/65`',
    )
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenNthCalledWith(1, pokemonResource, options)
  })

  it('should throw an error on failed responses', async () => {
    const pokemonResource: string = 'https://pokeapi.co/api/v2/pokemon/1'
    const abilityResource: string = 'https://pokeapi.co/api/v2/ability/65'

    const resolver: Resolver = {
      'abilities[].ability.url': null,
    }

    const options: RequestInit = {
      headers: { Authorization: 'Bearer token', 'X-Cache-Control': 'v2' },
    }

    global.fetch = jest.fn(
      (nextResource: string, nextOptions?: RequestInit): Promise<Response> => {
        expect(nextOptions).toBe(options)

        if (nextResource === pokemonResource) {
          return Promise.resolve(
            mockResponse({
              id: 1,
              abilities: [
                {
                  ability: {
                    name: 'overgrow',
                    url: abilityResource,
                  },
                },
              ],
            }),
          )
        }

        if (nextResource === abilityResource) {
          return Promise.resolve(mockResponse({}, false))
        }

        return Promise.resolve(mockResponse({}))
      },
    ) as typeof global.fetch

    await expect(restql(pokemonResource, resolver, options)).rejects.toThrow(
      'RuntimeError: could not fetch resource `https://pokeapi.co/api/v2/ability/65`',
    )
    expect(global.fetch).toHaveBeenCalledTimes(2)
    expect(global.fetch).toHaveBeenNthCalledWith(1, pokemonResource, options)
    expect(global.fetch).toHaveBeenNthCalledWith(2, abilityResource, options)
  })

  it('should resolve nested resources on successful responses', async () => {
    const pokemonResource: string = 'https://pokeapi.co/api/v2/pokemon/1'
    const abilityResource: string = 'https://pokeapi.co/api/v2/ability/65'
    const generationResource: string = 'https://pokeapi.co/api/v2/generation/3'
    const regionResource: string = 'https://pokeapi.co/api/v2/region/3'

    const resolver: Resolver = {
      'abilities[].ability.url': {
        'generation.url': null,
      },
    }

    const options: RequestInit = {
      headers: { Authorization: 'Bearer token', 'X-Cache-Control': 'v3' },
    }

    global.fetch = jest.fn(
      (nextResource: string, nextOptions?: RequestInit): Promise<Response> => {
        expect(nextOptions).toBe(options)

        if (nextResource === pokemonResource) {
          return Promise.resolve(
            mockResponse({
              id: 1,
              abilities: [
                {
                  ability: {
                    name: 'overgrow',
                    url: abilityResource,
                  },
                },
              ],
            }),
          )
        }

        if (nextResource === abilityResource) {
          return Promise.resolve(
            mockResponse({
              id: 65,
              effect_changes: [],
              effect_entries: [],
              generation: {
                name: 'generation-iii',
                url: generationResource,
              },
            }),
          )
        }

        if (nextResource === generationResource) {
          return Promise.resolve(
            mockResponse({
              id: 3,
              name: 'generation-iii',
              main_region: {
                name: 'hoenn',
                url: regionResource,
              },
            }),
          )
        }

        return Promise.resolve(mockResponse({}))
      },
    ) as typeof global.fetch

    const received = await restql(pokemonResource, resolver, options)

    expect(global.fetch).toHaveBeenCalledTimes(3)
    expect(global.fetch).toHaveBeenNthCalledWith(1, pokemonResource, options)
    expect(global.fetch).toHaveBeenNthCalledWith(2, abilityResource, options)
    expect(global.fetch).toHaveBeenNthCalledWith(3, generationResource, options)
    expect(received).toEqual({
      id: 1,
      abilities: [
        {
          ability: {
            name: 'overgrow',
            url: {
              id: 65,
              effect_changes: [],
              effect_entries: [],
              generation: {
                name: 'generation-iii',
                url: {
                  id: 3,
                  name: 'generation-iii',
                  main_region: {
                    name: 'hoenn',
                    url: 'https://pokeapi.co/api/v2/region/3',
                  },
                },
              },
            },
          },
        },
      ],
    })
  })
})
