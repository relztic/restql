// External Packages
import axios from 'axios'
import md5 from 'md5'

/**
 * @constant {Object} responses The responses to cache.
 */
const responses = {}

/**
 * Fetches the resource based on its options, if not cached.
 *
 * @param {string} resource The resource to fetch.
 * @param {Object} options  The options to bypass.
 * @returns {Promise<Object>} A promise which resolves into an object.
 */
export default async function fetchResource(resource, options) {
  const key = md5(`${resource}-${JSON.stringify(options)}`)

  if (!(key in responses)) {
    responses[key] = axios(resource, options).then(response => {
      responses[key] = response

      return response
    })
  }

  return responses[key]
}
