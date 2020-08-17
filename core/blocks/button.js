const getButtonBlock = (text, value, actionId) => ({
  type: 'button',
  text: {
    type: 'plain_text',
    text,
    emoji: true,
  },
  value,
  action_id: actionId,
})

module.exports = getButtonBlock
