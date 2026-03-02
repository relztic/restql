/**
 * @constant {Object} responses The responses to mock.
 */
const responses = {
  'https://pokeapi.co/api/v2/pokemon/1/': {},
}

/**
 * Reference: [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch)
 *
 * @param {string} resource The resource to fetch.
 * @returns {Promise<Object>} A promise which resolves into an object.
 */
export default async function fetch(resource) {
  return new Promise((resolve) => {
    setTimeout(resolve, 100, responses[resource])
  })
}
