import { capitalize } from './formatters'

describe('capitalize', () => {
  it('should capitalize the first letter of any given string', () => {
    const string = 'hello world'

    expect(capitalize(string)).toBe('Hello world')
  })
})
