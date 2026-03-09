# RestQL

RESTful API Resolver for Nested-Linked Resources | 🕸 🕷

---

[![npm](https://img.shields.io/npm/v/restql.svg?style=for-the-badge)](https://www.npmjs.com/package/restql)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prettier](https://img.shields.io/badge/-Prettier-FF69B4?style=for-the-badge&logo=prettier&logoColor=white)

RestQL allows you to dynamically resolve nested-linked resources of a RESTful API.  
By specifying a set of properties to describe the paths.

## Installation

### npm

```sh
npm install restql
```

### CDN

```html
<script src="https://unpkg.com/restql/dist/index.min.js"></script>
```

## Usage

### `restql<T>(resource, resolver[, options])`

#### Parameters

- `resource` (`string`): The main resource to fetch.

##### Example

```js
'https://pokeapi.co/api/v2/pokemon/1'
```

- `resolver` ([`Resolver`](https://github.com/relztic/restql/blob/main/src/types.ts#L1)): The resolver to apply.
  - At every level, each property describes a path to the nested resources within the same.
  - RestQL fetches all resources and calls the next resolver against them.
  - Until it reaches the base case (`null`), from which it returns a merged response.

##### Quantifiers

Following is a table of quantifiers you can use:

| Quantifier | Description               |
| ---------- | ------------------------- |
| `[]`       | Collection of properties. |
| `?`        | Optional property.        |

##### Example

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

- `[options]` ([`RequestInit`](https://developer.mozilla.org/en-US/docs/Web/API/RequestInit)): The options to configure.

##### Example

```js
{ ... }
```

#### Returns

(`Promise<T>`): A promise which resolves into a generic.

## Try It

```sh
npm run playground
```

[See Playground](https://github.com/relztic/restql/blob/main/playground/index.ts)

## Roadmap

- ~~Support for authentication~~
- ~~Support for optional resolvers~~
- ~~Improve package bundler~~
- ~~Ability to cache responses~~
- Support for recursive resolvers

> Take 🎂, Folks! 🌮 🐴 💨
