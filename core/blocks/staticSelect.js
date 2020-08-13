const getStaticSelectBlock = (
  actionId,
  placeholder,
  options,
  value = '',
  initialOption = '',
) => {
  const staticSelect = {
    type: 'static_select',
    action_id: actionId,
    placeholder: {
      type: 'plain_text',
      text: placeholder,
      emoji: true,
    },
    options,
  }

  if (initialOption) {
    staticSelect['initial_option'] = {
      text: {
        type: 'plain_text',
        text: initialOption, // retrieve from DB
        emoji: true,
      },
      value,
    }
  }

  return staticSelect
}

module.exports = getStaticSelectBlock
