const getInputBlock = (blockId, actionId, placeholder, label, hint) => ({
  type: 'input',
  block_id: blockId,
  element: {
    type: 'plain_text_input',
    action_id: actionId,
    placeholder: {
      type: 'plain_text',
      text: placeholder,
    },
  },
  label: {
    type: 'plain_text',
    text: label,
  },
  hint: {
    type: 'plain_text',
    text: hint,
  },
})

module.exports = getInputBlock
