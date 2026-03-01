# RestQL.js

RESTful API Resolver for Nested-Linked Resources | 🕸 🕷

---

[![npm](https://img.shields.io/npm/v/restql.svg?style=for-the-badge)](https://www.npmjs.com/package/restql/)
![JavaScript](https://img.shields.io/badge/-JavaScript-F0DB4F?style=for-the-badge&logo=typescript&logoColor=black)
![Prettier](https://img.shields.io/badge/-Prettier-FF69B4?style=for-the-badge&logo=prettier&logoColor=white)

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

At every level, each property describes a path to the nested resources within the current one.  
RestQL resolves the sames and call the subsequent resolver against them.  
Until the base case (`null`) is reached; from which it returns back the merged responses.

**Quantifiers**

Following is a table of the quantifiers you can use:

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

[Request Config](https://github.com/axios/axios/tree/v1.13.6#request-config)

## Usage

```sh
npm run playground
```

[See Playground](https://github.com/relztic/restql/blob/main/playground/index.js)

## Roadmap

- ~~Support for authentication~~
- ~~Support for optional resolvers~~
- ~~Improve package bundler~~
- ~~Ability to cache responses~~
- Support for recursive resolvers

Take 🎂, Folks! 🌮 🐴 💨
