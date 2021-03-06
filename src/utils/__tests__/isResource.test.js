// Internal Packages
import isResource from '../isResource'

describe('isResource', () => {
  it('should return `true` on valid resources', () => {
    const resource = 'https://pokeapi.co/api/v2/pokemon/1/?foo=bar'

    expect(isResource(resource)).toBe(true)
  })

  it('should return `false` on invalid resources', () => {
    const resource = 'https://pokeapi.co/api/v2/pokemon/1/ foo bar'

    expect(isResource(resource)).toBe(false)
  })

  it('should return `false` on empty resources', () => {
    const resource = ''

    expect(isResource(resource)).toBe(false)
  })
})
