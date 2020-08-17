const fetch = require('node-fetch')
const { formatIssues, today } = require('@utils/formatters')
const { btoa } = require('@utils/encoding')
const { findByTeamId } = require('@db/models/Workspace')
const { getSectionBlock } = require('@core/blocks')

module.exports = app => async ({ ack, payload, context }) => {
  ack()

  const jiraUser = await findByTeamId(payload.team_id)

  let additionalTasks
  const userText = payload.text.trim()

  if (userText && userText === 'help') {
    try {
      return await app.client.chat.postMessage({
        token: context.botToken,
        channel: payload.channel_id,
        blocks: [
          getSectionBlock(
            '> This app is relatively easy to use. Just hit the command.\n _For example:_ `/standup`',
          ),
        ],
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

  const token = btoa(jiraUser.email, jiraUser.token)
  const jql = `project=${process.env.PROJECT} AND assignee=currentuser() AND status IN ("Dev Prioritised")`

  try {
    const results = await fetch(
      `${jiraUser.project}/rest/api/2/search?jql=${jql}`,
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      },
    )
    const { issues } = await results.json()
    const blocks = [
      getSectionBlock(
        `> *@${payload.user_name}'s standup for today, ${today()}*`,
      ),
      getSectionBlock('Jira tickets currently working on:'),
      // limit to 16 issues = 2845 chars, due to invalid_blocks error: max length 3001 chars
      getSectionBlock(`${formatIssues(issues.slice(0, 16), jiraUser.project)}`),
    ]

    if (additionalTasks) {
      blocks.push(getSectionBlock(`Additional tasks:\n${additionalTasks}`))
    }

    await app.client.chat.postMessage({
      token: context.botToken,
      channel: payload.channel_id,
      blocks,
    })
  } catch (error) {
    console.log(error)
    console.log(error.data.response_metadata.messages)
  }
}
