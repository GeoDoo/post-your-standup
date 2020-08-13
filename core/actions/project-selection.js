const fetch = require('node-fetch')
const { btoa } = require('@utils/encoding')
const { sortByName } = require('@utils/sort')
const { ACTIONS } = require('@root/constants')
const { findByTeamId } = require('@db/models/Workspace')
const {
  getSectionBlock,
  getDividerBlock,
  getButtonBlock,
  getStaticSelectBlock,
  getOptionBlock,
} = require('@core/blocks')

module.exports = app => async ({ ack, body, context }) => {
  ack()

  console.log('project:selection', body)

  const selectedProject = body.actions[0].selected_option.value // save to DB

  try {
    const jiraUser = await findByTeamId(body.team.id)
    const token = btoa(jiraUser.email, jiraUser.token)

    const statuses = await fetch(
      `${jiraUser.project}/rest/api/2/project/${selectedProject}/statuses`,
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      },
    )
    const [statusesForSelectedProject] = await statuses.json()
    const statusOptionsForSelectedProject = sortByName(
      statusesForSelectedProject.statuses,
    ).map(status => getOptionBlock(status.name, status.name))

    const projects = await fetch(`${jiraUser.project}/rest/api/2/project`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    })
    const projectSelectOptions = sortByName(
      await projects.json(),
    ).map(project =>
      getOptionBlock(`${project.name} (${project.key})`, project.key),
    )

    const { channels } = await app.client.conversations.list({
      token: process.env.SLACK_BOT_TOKEN,
      exclude_archived: true,
      types: 'public_channel,private_channel',
    })
    const allChannelsOptions = sortByName(channels).map(channel =>
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
            'Basic authentication has already been successfully set up. Congrats!\nIf you wish to change Jira account though, you can set a new one by clicking below\n',
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
              getStaticSelectBlock(
                ACTIONS.BOARD_COLUMN,
                'Select a board column',
                statusOptionsForSelectedProject,
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
    console.error(error)
  }
}
