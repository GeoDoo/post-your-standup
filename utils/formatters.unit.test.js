const { today, formatIssues } = require('./formatters')

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

  describe('formatIssues', () => {
    it('should provide standup issues in a nice format', () => {
      const data = [
        {
          key: 'key',
          fields: {
            summary: 'summary',
            status: 'status',
            updated: 10021230120,
          },
        },
      ]

      expect(formatIssues(data)).toMatchSnapshot()
    })

    it('should provide useful feedback when no issues found', () => {
      const data = []

      expect(formatIssues(data)).toBe('No issues found. All done here!')
    })
  })
})
