const { isEmail } = require('./validate')

describe('isEmail', () => {
  it('should check if email is a real email', () => {
    const email1 = 'test@test.com'
    const email2 = 'test.tester@test.com'
    const email3 = 'test.tester@test'
    const email4 = 'test.tester'
    const email5 = '!£$£$!£$@ASDASD'

    expect(isEmail(email1)).toBe(true)
    expect(isEmail(email2)).toBe(true)
    expect(isEmail(email3)).toBe(true)
    expect(isEmail(email4)).toBe(false)
    expect(isEmail(email5)).toBe(false)
  })
})
