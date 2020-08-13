const { getDividerBlock } = require('./index')

describe('Divider block', () => {
  it('should return a block of type divider', () => {
    const dividerBlock = getDividerBlock()

    expect(dividerBlock).toEqual({
      type: 'divider',
    })
  })
})
