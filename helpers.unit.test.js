const { today } = require('./helpers')

jest.mock('moment', () => () => ({ format: () => '30/01/2020' }))

describe('today', () => {
  it("should provide the today's date in a nice format", () => {
    expect(today()).toBe('30/01/2020')
  })
})
