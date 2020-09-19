const fetch = require('node-fetch')
const { formatIssues, today } = require('@utils/formatters')
const { btoa } = require('@utils/encoding')
const { findByTeamId } = require('@db/models/Workspace')
const { getSectionBlock } = require('@core/blocks')

module.exports = app => async ({ ack, payload, context }) => {
  ack()

  try {
    const jiraUser = await findByTeamId(payload.team_id)
    const userText = payload.text.trim()

    if (!userText) {
      try {
        return await app.client.chat.postEphemeral({
          token: context.botToken,
          channel: payload.channel_id,
          text:
            ':thinking_face: did you forget to type the key of your project?',
          user: payload.user_id,
        })
      } catch (e) {
        console.error(e)
        return
      }
    }

    if (userText && userText === 'help') {
      try {
        return await app.client.chat.postMessage({
          token: context.botToken,
          channel: payload.channel_id,
          blocks: [
            getSectionBlock(
              "> This app is relatively easy to use.\n You will need to type `/standup`, leave a space and then the key of the project you want to post from. The key is usually the first part of any ticket's name. _For example_: Given you have tickets like DSUS-14, DSUS-567, then you will need to type: `/standup DSUS`",
            ),
          ],
        })
      } catch (e) {
        console.error(e)
        return
      }
    }

    const email = userText.split(' ')[0]
    const project = userText.split(' ')[1]
    const token = btoa(jiraUser.email, jiraUser.token)
    const query = `query=is assignee of ${project}`
    const response = await fetch(
      `${jiraUser.project}/rest/api/2/user/search/query?${query}`,
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      },
    )
    const users = await response.json()
    const [currentUser] = users.values.filter(
      user => email === user.emailAddress,
    )
    const jql = `project=${project} AND assignee=${currentUser.accountId}`
    const results = await fetch(
      `${jiraUser.project}/rest/api/2/search?jql=${jql}`,
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      },
    )

    if (results.status === 400) {
      return await app.client.chat.postEphemeral({
        token: context.botToken,
        channel: payload.channel_id,
        text: ':thinking_face: Are you sure you typed the correct project key?',
        user: payload.user_id,
      })
    }

    const { issues } = await results.json()
    const blocks = [
      getSectionBlock(
        `> *@${payload.user_name}'s standup for today, ${today()}*`,
      ),
      getSectionBlock('Jira tickets currently working on:'),
      // limit to 16 issues = 2845 chars, due to invalid_blocks error: max length 3001 chars
      getSectionBlock(`${formatIssues(issues.slice(0, 16), jiraUser.project)}`),
    ]

    await app.client.chat.postMessage({
      token: context.botToken,
      channel: payload.channel_id,
      blocks,
    })
  } catch (e) {
    console.error(e)
  }
}
