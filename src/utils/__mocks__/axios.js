/**
 * @constant {Object} responses The responses to mock.
 */
const responses = {
  'https://pokeapi.co/api/v2/pokemon/1/': {},
}

/**
 * Reference: [axios](https://github.com/axios/axios/tree/v1.13.6/)
 *
 * @param {string} resource The resource to fetch.
 * @returns {Promise<Object>} A promise which resolves into an object.
 */
export default async function axios(resource) {
  return new Promise((resolve) => {
    setTimeout(resolve, 100, responses[resource])
  })
}
