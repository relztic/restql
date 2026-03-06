import restql, { type Resolver } from '../src'

interface Pokemon {
  name: string
  abilities: object[]
  stats: object[]
  moves: object[]
}

const resource: string = 'https://pokeapi.co/api/v2/pokemon/1/'

const resolver: Resolver = {
  'abilities[]?.ability.url': {
    'generation.url': {
      'main_region.url': null,
    },
  },
  'stats[].stat.url?': {
    'affecting_natures.increase[].url': null,
    'affecting_natures.decrease[].url': null,
  },
  'moves[].move?.url': null,
}

const options: RequestInit = {
  // ...
}

;(async () => {
  try {
    const pokemon = await restql<Pokemon>(resource, resolver, options)

    console.log(pokemon.name)
  } catch (error) {
    console.error(error.message)
  }
})()
