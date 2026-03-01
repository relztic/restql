import restql from '../src'

/**
 * @constant {string} resource The resource to fetch.
 */
const resource = 'https://pokeapi.co/api/v2/pokemon/1/'

/**
 * @constant {Object} resolver The resolver to apply.
 */
const resolver = {
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

/**
 * @constant {Object} options The options to bypass.
 */
const options = {
  // ...
}

;(async () => {
  try {
    const data = await restql(resource, resolver, options)

    console.log(data)
  } catch (error) {
    console.error(error.message)
  }
})()
