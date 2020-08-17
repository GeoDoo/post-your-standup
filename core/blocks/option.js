const getOptionBlock = (text, value) => ({
  text: {
    type: 'plain_text',
    text,
    emoji: true,
  },
  value,
})

module.exports = getOptionBlock
