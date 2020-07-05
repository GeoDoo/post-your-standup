const { today } = require('./helpers')

jest.mock('moment', () => () =>
  jest.requireActual('moment')('2020-01-31T00:00:00.000Z'),
)

describe('Helpers', () => {
  afterEach(() => {
    jest.resetModules()
  })

  describe('today', () => {
    it("should provide the today's date in a nice format", () => {
      expect(today()).toBe('31-01-2020')
    })
  })
})
