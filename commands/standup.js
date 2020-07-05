const fetch = require('node-fetch')
const { formatIssues, today } = require('../helpers')
const { btoa } = require('../utils')

module.exports = app => async ({ ack, payload, context }) => {
  ack()

  let additionalTasks
  const userText = payload.text.trim()

  if (userText && userText === 'help') {
    try {
      return await app.client.chat.postMessage({
        token: context.botToken,
        channel: payload.channel_id,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text:
                '> This app is relatively easy to use. Just hit the command.\n _For example:_ `/standup`',
            },
          },
        ],
        text: 'Message from Post Your Standup App',
      })
    } catch (error) {
      console.log(error)
      return
    }
  } else {
    const tasks = userText ? userText.split(',').map(task => task.trim()) : []
    additionalTasks = tasks.length
      ? tasks.map(task => `•  ${task}\n`).join('')
      : ''
  }

  const token = btoa()
  // TODO: columns need to be user selected from Home settings
  const jql = `project=${process.env.PROJECT} AND assignee=currentuser() AND status IN ("Dev Prioritised")`

  try {
    const results = await fetch(
      `${process.env.BASE_URL}/rest/api/2/search?jql=${jql}`,
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      },
    )
    const { issues } = await results.json()
    const blocks = [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `> *@${payload.user_name}'s standup for today, ${today()}*`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Jira tickets currently working on:',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `${formatIssues(issues.slice(0, 16))}`, // limit to 16 issues = 2845 chars, due to invalid_blocks error: max length 3001 chars
        },
      },
    ]

    if (additionalTasks) {
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Additional tasks:\n${additionalTasks}`,
        },
      })
    }

    await app.client.chat.postMessage({
      token: context.botToken,
      channel: payload.channel_id,
      blocks,
      text: 'Message from Post Your Standup App',
    })
  } catch (error) {
    console.log(error)
    console.log(error.data.response_metadata.messages)
  }
}
