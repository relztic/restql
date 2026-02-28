# RestQL.js

RESTful API Resolver for Nested-Linked Resources | 🕸 🕷

---

[![npm](https://img.shields.io/npm/v/restql.svg?style=flat-square)](https://www.npmjs.com/package/restql/)
[![build](https://img.shields.io/travis/relztic/restql/main.svg?style=flat-square)](https://travis-ci.org/relztic/restql/)
[![maintainability](https://img.shields.io/codeclimate/maintainability/relztic/restql.svg?style=flat-square)](https://codeclimate.com/github/relztic/restql/maintainability/)
[![coverage](https://img.shields.io/codeclimate/c/relztic/restql.svg?style=flat-square)](https://codeclimate.com/github/relztic/restql/test_coverage/)
[![code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier/)

RestQL allows you to dynamically resolve the nested-linked resources of a RESTful API.

By specifying a set of properties to describe the paths.

## Installation

### npm

```sh
npm install restql
```

### CDN

```html
<script src="https://unpkg.com/restql/dist/umd/index.min.js"></script>
```

## Parameters

### `resource`

`{string} The resource to fetch.`

**Description**

Self-explanatory.

**e.g.:**

```js
'https://pokeapi.co/api/v2/pokemon/1/'
```

### `resolver`

`{Object} The resolver to apply.`

**Description**

At each level, each property describes a path to the nested resources within the current one.

RestQL resolves the sames and call the subsequent resolver against them...

Until the base case (`null`) is reached; from which it returns back the merged responses.

**Quantifiers**

Following is a table of the quantifiers you can use:

| Quantifier | Description |
| --- | --- |
| `[]` | Collection of properties. |
| `?` | Optional property. |

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

[`Request Config`](https://github.com/axios/axios/#request-config)

**e.g.:**

```js
{
  // ...
}
```

## Usage

```js
// External Packages
import restql from 'restql'

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
};

(async () => {
  try {
    const data = await restql(resource, resolver, options)

    console.log(data)
  } catch (error) {
    console.error(error.message)
  }
})()
```

[Test RestQL in your browser.](https://npm.runkit.com/restql/)

## Roadmap

  - ~~Support for authentication~~
  - ~~Support for optional resolvers~~
  - ~~Improve package bundler~~
  - ~~Ability to cache responses~~
  - Support for recursive resolvers

Take 🍰, Folks! 🌮 🐴 💨
