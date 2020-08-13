const { getButtonBlock } = require('./index')

describe('Button block', () => {
  it('should return a block of type button', () => {
    const buttonBlock = getButtonBlock(
      'Add another',
      'some_value',
      'some:action',
    )

    expect(buttonBlock).toEqual({
      type: 'button',
      text: {
        type: 'plain_text',
        text: 'Add another',
        emoji: true,
      },
      value: 'some_value',
      action_id: 'some:action',
    })
  })
})
