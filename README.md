# RestQL.js

RESTful API Resolver for Nested-Linked Resources | :spider_web: :spider:

---

[![npm version](https://badge.fury.io/js/restql.svg)](https://badge.fury.io/js/restql)
[![Build Status](https://travis-ci.org/relztic/restql.svg?branch=master)](https://travis-ci.org/relztic/restql)
[![Maintainability](https://api.codeclimate.com/v1/badges/6411a3b2ccf0c91cadd4/maintainability)](https://codeclimate.com/github/relztic/restql/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6411a3b2ccf0c91cadd4/test_coverage)](https://codeclimate.com/github/relztic/restql/test_coverage)

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
