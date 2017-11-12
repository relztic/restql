// External packages.
import urlRegex from 'url-regex';

/**
 * Determines whether or not the resource is valid.
 *
 * @param {string} resource The resource to fetch.
 * @returns {boolean} Whether or not the resource is valid.
 */
export default function isResource(resource) {
  return (urlRegex({ exact: true }).test(resource));
}
