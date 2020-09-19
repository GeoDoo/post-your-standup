const fetch = require('node-fetch')
const { formatIssues, today } = require('@utils/formatters')
const { btoa } = require('@utils/encoding')
const { isEmail } = require('@utils/validate')
const { findByTeamId } = require('@db/models/Workspace')
const { getSectionBlock } = require('@core/blocks')

module.exports = app => async ({ ack, payload, context }) => {
  ack()

  try {
    const jiraUser = await findByTeamId(payload.team_id)
    const userText = payload.text.trim()

    if (userText && userText === 'help') {
      try {
        return await app.client.chat.postMessage({
          token: context.botToken,
          channel: payload.channel_id,
          blocks: [
            getSectionBlock(
              "> This app is relatively easy to use. It needs two pieces of information from you: your Jira email and your tickets' prefix. Easy peasy!\n An example can be: `/standup my.jira.email@company.com DSUS`\n _hint: if you have a ticket DSUS-1 or SMD-234, then DSUS and SMD are the prefixes_",
            ),
          ],
        })
      } catch (e) {
        console.error(e)
        return
      }
    }

    const email = userText && userText.split(' ')[0]
    const project = userText && userText.split(' ')[1]

    if (email && !isEmail(email)) {
      try {
        return await app.client.chat.postEphemeral({
          token: context.botToken,
          channel: payload.channel_id,
          text:
            ":thinking_face: did you type your email correctly? Doesn't seem right to me! :smile:",
          user: payload.user_id,
        })
      } catch (e) {
        console.error(e)
        return
      }
    }

    if (!email || !project) {
      try {
        return await app.client.chat.postEphemeral({
          token: context.botToken,
          channel: payload.channel_id,
          text:
            ':thinking_face: did you forget to type your email or project prefix? We need both of them! :slightly_smiling_face:',
          user: payload.user_id,
        })
      } catch (e) {
        console.error(e)
        return
      }
    }

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

    if (!currentUser) {
      try {
        return await app.client.chat.postEphemeral({
          token: context.botToken,
          channel: payload.channel_id,
          text:
            ':sob: we could not match your email or project! Are you absolutely certain you typed your Jira email AND project correctly? Please try again, thanks! :slightly_smiling_face:',
          user: payload.user_id,
        })
      } catch (e) {
        console.error(e)
        return
      }
    }

    const jql = `project=${project} AND assignee=${currentUser.accountId}`
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

    await app.client.chat.postMessage({
      token: context.botToken,
      channel: payload.channel_id,
      blocks,
    })
  } catch (e) {
    console.error(e)
  }
}
