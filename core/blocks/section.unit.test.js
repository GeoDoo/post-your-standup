const { getSectionBlock } = require('./index')

describe('Section block', () => {
  it('should return a block of type section with the correct text', () => {
    const sectionBlock = getSectionBlock('Some text')

    expect(sectionBlock).toEqual({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'Some text',
      },
    })
  })
})
