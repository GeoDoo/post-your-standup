const fetch = require('node-fetch')
const { JIRA_API_PATH, TEXT } = require('@root/constants')
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

    if (userText && userText === TEXT.COMMANDS.HELP_TEXT_MATCH) {
      try {
        return await app.client.chat.postMessage({
          token: context.botToken,
          channel: payload.channel_id,
          blocks: [getSectionBlock(TEXT.COMMANDS.STANDUP.HELP)],
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
          text: TEXT.COMMANDS.STANDUP.INVALID_EMAIL,
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
          text: TEXT.COMMANDS.STANDUP.NO_TEXT,
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
      `${jiraUser.project}/${JIRA_API_PATH.SEARCH_USER}?${query}`,
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
          text: TEXT.COMMANDS.STANDUP.NO_USER,
          user: payload.user_id,
        })
      } catch (e) {
        console.error(e)
        return
      }
    }

    const todayJql = `jql=project=${project} AND assignee=${currentUser.accountId} AND updatedDate >= startOfDay() and updatedDate < endOfDay()`
    const todayResults = await fetch(
      `${jiraUser.project}/${JIRA_API_PATH.SEARCH}?${todayJql}`,
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      },
    )
    const { issues: todayIssues } = await todayResults.json()
    const yesterdayJql = `jql=project=${project} AND assignee=${currentUser.accountId} AND updatedDate < startOfDay() AND updatedDate > -1d ORDER BY updatedDate asc`
    const yesterdayResults = await fetch(
      `${jiraUser.project}/${JIRA_API_PATH.SEARCH}?${yesterdayJql}`,
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      },
    )
    const { issues: yesterdayIssues } = await yesterdayResults.json()
    const blockersJql = `jql=project=${project} AND assignee=${currentUser.accountId} AND (issueLinkType = blocks or issueLinkType = "is blocked by")`
    const blockersResults = await fetch(
      `${jiraUser.project}/${JIRA_API_PATH.SEARCH}?${blockersJql}`,
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      },
    )
    const { issues: blockersIssues } = await blockersResults.json()

    const blocks = [
      getSectionBlock(
        `> *@${payload.user_name}'s standup for today, ${today()}*`,
      ),
      getSectionBlock('*Yesterday:*'),
      getSectionBlock(`${formatIssues(yesterdayIssues, jiraUser.project)}`),
      getSectionBlock('*Today:*'),
      getSectionBlock(`${formatIssues(todayIssues, jiraUser.project)}`),
    ]

    if (blockersIssues && blockersIssues.length > 0) {
      blocks.push(
        getSectionBlock('*Blockers:*'),
        getSectionBlock(`${formatIssues(blockersIssues, jiraUser.project)}`),
      )
    }

    await app.client.chat.postMessage({
      token: context.botToken,
      channel: payload.channel_id,
      blocks,
    })
  } catch (e) {
    console.error(e)
  }
}
