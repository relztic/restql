# RestQL.js

RESTful API Resolver for Nested-Linked Resources | :spider_web: :spider:

---

[![Build Status](https://travis-ci.org/relztic/restql.svg?branch=master)](https://travis-ci.org/relztic/restql)

RestQL allows you to dynamically resolve the nested-linked resources of a RESTful API.

By specifying a set of properties to describe the paths.

## Installation

### npm

```sh
npm install --save restql
```

### Yarn

```sh
yarn add restql
```

## Usage

```js
// External packages.
import restql from 'restql';

const resource = 'https://pokeapi.co/api/v2/pokemon/1';

const resolver = {
  'abilities[].ability.url': {
    'generation.url': {
      'main_region.url': null,
    },
  },
  'stats[].stat.url': {
    'affecting_natures.increase[].url': null,
    'affecting_natures.decrease[].url': null,
  },
  'moves[].move.url': null,
};

/* eslint-disable no-console */
(async () => {
  try {
    const result = await restql(resource, resolver);

    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
})();
/* eslint-enable no-console */
```

## Roadmap

  - Support for optional resolvers.
  - Support for a `query` param.
  - Support for custom authentication.
  - Ability to cache responses.

Until next time... Take :cake:, Folks! :taco: :horse: :dash:
