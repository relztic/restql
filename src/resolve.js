// External packages.
import _ from 'lodash';
import fetch from 'node-fetch';

// Internal packages.
import isResource from './utils/isResource';
import objectGet from './utils/objectGet';
import objectSet from './utils/objectSet';

/**
 * Resolves the nested-linked resources of a RESTful API.
 *
 * @param {string} resource The resource to fetch.
 * @param {Object} resolver The resolver to apply.
 * @returns {Promise<Object>} A promise which resolves into an object.
 * @throws {InvalidArgumentError} If a resource is invalid.
 * @throws {RuntimeError} If a resource couldn't be fetched.
 */
export default async function resolve(resource, resolver) {
  if (!isResource(resource)) {
    throw new Error(`InvalidArgumentError: \`resource\` (${resource})`);
  }

  const response = await fetch(resource);

  if (!response.ok) {
    throw new Error(`RuntimeError: couldn't be fetched (${resource})`);
  }

  const obj = await response.json();

  if (!resolver) {
    return obj;
  }

  const resourcesObj = Object.keys(resolver).map(props => ({ [props]: objectGet(obj, props) }));

  const resourcesArr = Object.entries(resourcesObj.reduce((result, val) => ({ ...result, ...val }), {}));

  const responses = await Promise.all(resourcesArr.map(async ([props, resources]) => {
    const nextResolver = resolver[props];

    const data = (Array.isArray(resources))
      ? await Promise.all(resources.map(async nextResource => resolve(nextResource, nextResolver)))
      : await resolve(resources, nextResolver);

    return [props, data];
  }));

  return responses.reduce((result, [props, data]) => _.merge(result, objectSet(data, props)), obj);
}
