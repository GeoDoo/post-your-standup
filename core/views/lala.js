const fetch = require('node-fetch')
const { btoa } = require('@utils/encoding')
const { ACTIONS } = require('@root/constants')
const { sortByName } = require('@utils/sort')
const { upsertWorkspace } = require('@db/models/Workspace')
const {
  getSectionBlock,
  getDividerBlock,
  getButtonBlock,
  getStaticSelectBlock,
  getOptionBlock,
} = require('@core/blocks')

module.exports = app => async ({ ack, body, view, context }) => {
  ack()

  const jiraEmail = view.state.values.jira_email.email.value.trim()
  const jiraToken = view.state.values.jira_token.token.value.trim()
  const jiraProjectDomain = view.state.values.jira_domain.projectDomain.value.trim()
  const filter = { teamId: body.team.id }
  const update = {
    teamId: body.team.id,
    domain: body.team.domain,
    email: jiraEmail,
    token: jiraToken,
    project: jiraProjectDomain,
  }

  try {
    await upsertWorkspace(filter, update)

    const token = btoa(jiraEmail, jiraToken)
    const results = await fetch(`${jiraProjectDomain}/rest/api/2/project`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    })
    const projects = await results.json()
    const projectSelectOptions = sortByName(projects).map(project =>
      getOptionBlock(`${project.name} (${project.key})`, project.key),
    )

    const result = await app.client.conversations.list({
      token: process.env.SLACK_BOT_TOKEN,
      exclude_archived: true,
      types: 'public_channel,private_channel', // magic
    })
    const allChannelsOptions = result.channels.map(channel =>
      getOptionBlock(channel.name, channel.name),
    )

    await app.client.views.publish({
      token: context.botToken,
      user_id: body.user.id,
      view: {
        type: 'home',
        callback_id: 'home_view',
        blocks: [
          getSectionBlock('*Welcome to your _Post Your Standup_ app*'),
          getSectionBlock(
            'Our app enables teams to collaborate more efficiently by posting their standups for a Jira project to their dedicated channels.\nMake your project manager happy, team! :tada::tada::tada:\n',
          ),
          getSectionBlock('\n'),
          getDividerBlock(),
          getSectionBlock(':gear: *Settings*\n'),
          getSectionBlock(
            'Basic authentication has already been successfully set up. Congrats!\nIf you wish to change Jira account though, you can set a new one by clicking below:\n',
          ),
          {
            type: 'actions',
            elements: [
              getButtonBlock(
                'Change Jira account',
                'change_jira_account',
                ACTIONS.OPEN_SETUP_JIRA_MODAL,
              ),
            ],
          },
          {
            type: 'actions',
            elements: [
              getStaticSelectBlock(
                ACTIONS.CHANNEL_SELECTION,
                'Select a channel',
                allChannelsOptions,
              ),
              getStaticSelectBlock(
                ACTIONS.PROJECT_SELECTION,
                'Select your project',
                projectSelectOptions,
              ),
              getButtonBlock(
                'Add another',
                'add_another_project_to_channel',
                'add:project_to_channel',
              ),
            ],
          },
        ],
      },
    })
  } catch (error) {
    console.log(error)
  }
}
