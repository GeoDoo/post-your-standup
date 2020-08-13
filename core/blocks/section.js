const getSectionBlock = text => ({
  type: 'section',
  text: {
    type: 'mrkdwn',
    text,
  },
})

module.exports = getSectionBlock
