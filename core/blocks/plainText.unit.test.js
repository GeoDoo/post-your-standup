const { getPlainTextBlock } = require('./index')

describe('Section block', () => {
  it('should return a block of type section with the correct text', () => {
    const plainTextBlock = getPlainTextBlock('Some text')

    expect(plainTextBlock).toEqual({
      type: 'plain_text',
      text: 'Some text',
    })
  })
})
