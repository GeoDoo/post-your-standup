const { getInputBlock } = require('./index')

describe('Input block', () => {
  it('should return a block of type input with the correct parameters', () => {
    const inputBlock = getInputBlock(
      'user_email',
      'email',
      'Email for basic authentication',
      'Email',
      'User personal email',
    )

    expect(inputBlock).toEqual({
      type: 'input',
      block_id: 'user_email',
      element: {
        type: 'plain_text_input',
        action_id: 'email',
        placeholder: {
          type: 'plain_text',
          text: 'Email for basic authentication',
        },
      },
      label: {
        type: 'plain_text',
        text: 'Email',
      },
      hint: {
        type: 'plain_text',
        text: 'User personal email',
      },
    })
  })
})
