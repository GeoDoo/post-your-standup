const { getStaticSelectBlock } = require('./index')

describe('Static select block', () => {
  it('should return a block of type static_select', () => {
    const staticSelectBlock = getStaticSelectBlock(
      'some:action',
      'Select a channel',
      [
        {
          text: {
            type: 'plain_text',
            text: 'Option one',
            emoji: true,
          },
          value: 'Option one',
        },
      ],
      'some_value',
      'Initial option',
    )

    expect(staticSelectBlock).toEqual({
      type: 'static_select',
      action_id: 'some:action',
      placeholder: {
        type: 'plain_text',
        text: 'Select a channel',
        emoji: true,
      },
      options: [
        {
          text: {
            type: 'plain_text',
            text: 'Option one',
            emoji: true,
          },
          value: 'Option one',
        },
      ],
      initial_option: {
        text: {
          type: 'plain_text',
          text: 'Initial option',
          emoji: true,
        },
        value: 'some_value',
      },
    })
  })
})
