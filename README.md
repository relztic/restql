# RestQL.js

RESTful API Resolver for Nested-Linked Resources | :spider_web: :spider:

---

[![npm version](https://img.shields.io/npm/v/restql.svg)](https://www.npmjs.com/package/restql)
[![Build Status](https://img.shields.io/travis/relztic/restql/master.svg)](https://travis-ci.org/relztic/restql)
[![Maintainability](https://img.shields.io/codeclimate/maintainability/relztic/restql.svg)](https://codeclimate.com/github/relztic/restql/maintainability)
[![Test Coverage](https://img.shields.io/codeclimate/c/relztic/restql.svg)](https://codeclimate.com/github/relztic/restql/test_coverage)

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
