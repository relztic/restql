// Internal packages.
import isResolver from '../isResolver';

describe('isResolver', () => {
  it('should return `true` on valid resolvers', () => {
    const resolver = {
      ' foo.bar ': {
        ' bar.foo ': null,
      },
      ' bar.foo ': {
        ' foo.bar ': null,
      },
    };

    expect(isResolver(resolver)).toBe(true);
  });

  it('should return `false` on invalid resolvers', () => {
    const resolver = {
      '.foo bar.': {
        '.bar foo.': null,
      },
      '.bar foo.': {
        '.foo bar.': null,
      },
    };

    expect(isResolver(resolver)).toBe(false);
  });

  it('should return `false` on empty resolvers', () => {
    const resolver = {};

    expect(isResolver(resolver)).toBe(false);
  });
});
