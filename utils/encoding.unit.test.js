const { btoa } = require('./encoding')

describe('btoa', () => {
  it('should return a JWT token given a username and token', () => {
    const username = 'test'
    const token = '!@$%@$%±SDFSDGDFG^sjfjdsakkjafs'

    expect(btoa(username, token)).toBe(
      'dGVzdDohQCQlQCQlwrFTREZTREdERkdec2pmamRzYWtramFmcw==',
    )
  })
})
