const { getOptionBlock } = require('./index')

describe('Option block', () => {
  it('should return a block of type option with text value pair', () => {
    const optionBlock = getOptionBlock('Some text', 'Some value')

    expect(optionBlock).toEqual({
      text: {
        type: 'plain_text',
        text: 'Some text',
        emoji: true,
      },
      value: 'Some value',
    })
  })
})
