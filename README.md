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
npm install restql --save
```

### Yarn

```sh
yarn add restql
```

## Parameters

### `resource`

`{string} The resource to fetch.`

**Description**

Self-explanatory.

**e.g.:**

```js
'https://pokeapi.co/api/v2/pokemon/1'
```

### `resolver`

`{Object} The resolver to apply.`

**Description**

At each level, each property describes a path to the nested resources within the current one.

RestQL resolves the sames and call the subsequent resolver against them...

Until the base case (`null`) is reached; from which it returns back the merged responses.

**Quantifiers**

| Quantifier | Description               |
| ---------- | ------------------------- |
| `[]`       | Collection of properties. |
| `?`        | Optional property.        |

**e.g.:**

```js
{
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
```

### `[options]`

`{Object} The options to bypass.`

**Description**

[`request(options, callback)`](https://github.com/request/request#requestoptions-callback)

**e.g.:**

```js
{
  // ...
}
```

## Usage

```js
// External packages
import restql from 'restql'

const resource = 'https://pokeapi.co/api/v2/pokemon/1'

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

const options = {
  // ...
};

(async () => {
  try {
    const result = await restql(resource, resolver, options)

    console.log(result)
  } catch (error) {
    console.error(error.message)
  }
})()
```

## Roadmap

  - ~~Update package dependencies~~
  - ~~Support for authentication~~
  - Support for optional resolvers
  - Ability to cache responses
  - Support for a `query` param

Take :cake:, Folks! :taco: :horse: :dash:
