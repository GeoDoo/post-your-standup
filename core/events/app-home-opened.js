const { ACTIONS } = require('../../constants')

module.exports = app => async ({ event, context }) => {
  try {
    await app.client.views.publish({
      token: context.botToken,
      user_id: event.user,
      view: {
        type: 'home',
        callback_id: 'home_view',
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: '*Welcome to your _Post Your Standup_ app*',
            },
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text:
                'Our app enables teams to collaborate more efficiently by posting their standups for a Jira project to their dedicated channels.\nMake your project manager happy, team! :tada::tada::tada:\n',
            },
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: '\n',
            },
          },
          {
            type: 'divider',
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: ':gear: *Settings*\n',
            },
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: 'Setup basic authentication for your Jira projects\n',
            },
          },
          {
            type: 'actions',
            elements: [
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: 'Authenticate me',
                  emoji: true,
                },
                action_id: ACTIONS.OPEN_SETUP_JIRA_MODAL,
              },
            ],
          },
        ],
      },
    })
  } catch (error) {
    console.error(error.data.response_metadata)
  }
}
