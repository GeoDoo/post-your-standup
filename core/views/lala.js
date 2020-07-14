/* eslint-disable no-unused-vars */
const fetch = require('node-fetch')
const { btoa } = require('../../utils/encoding')
const { ACTIONS } = require('../../constants')
const { upsertWorkspace } = require('../../db/models/Workspace')

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
    const projectSelectOptions = projects
      .sort((a, b) => {
        if (a.name < b.name) {
          return -1
        }

        if (a.name > b.name) {
          return 1
        }

        return 0
      })
      .map(project => ({
        text: {
          type: 'plain_text',
          text: `${project.name} (${project.key})`,
          emoji: true,
        },
        value: project.key,
      }))

    const result = await app.client.conversations.list({
      token: process.env.SLACK_BOT_TOKEN,
      exclude_archived: true,
      types: 'public_channel,private_channel', // magic
    })
    const allChannelsOptions = result.channels.map(channel => ({
      text: {
        type: 'plain_text',
        text: channel.name,
        emoji: true,
      },
      value: channel.name,
    }))

    await app.client.views.publish({
      token: context.botToken,
      user_id: body.user.id,
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
              text:
                'Basic authentication has already been successfully set up. Congrats!\nIf you wish to change Jira account though, you can set a new one by clicking below:\n',
            },
          },
          {
            type: 'actions',
            elements: [
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: 'Change Jira account',
                  emoji: true,
                },
                action_id: ACTIONS.OPEN_SETUP_JIRA_MODAL,
              },
            ],
          },
          {
            type: 'actions',
            elements: [
              {
                type: 'static_select',
                action_id: ACTIONS.CHANNEL_SELECTION,
                placeholder: {
                  type: 'plain_text',
                  text: 'Select a channel',
                  emoji: true,
                },
                options: allChannelsOptions,
                // initial_option: {
                //   text: {
                //     type: "plain_text",
                //     text: `${process.env.JIRA_AUTH_USER}`, // retrieve from DB
                //     emoji: true
                //   },
                //   value: savedProject
                // }
              },
              {
                type: 'static_select',
                action_id: ACTIONS.PROJECT_SELECTION,
                placeholder: {
                  type: 'plain_text',
                  text: 'Select your project',
                  emoji: true,
                },
                options: projectSelectOptions,
                // initial_option: {
                //   text: {
                //     type: "plain_text",
                //     text: `${process.env.JIRA_AUTH_USER}`, // retrieve from DB
                //     emoji: true,
                //   },
                //   value: savedProject,
                // },
              },
              // {
              //   type: "static_select",
              //   action_id: "column:selection",
              //   placeholder: {
              //     type: "plain_text",
              //     text: "Select a board column",
              //     emoji: true
              //   },
              //   options: projectSelectOptions
              //   // initial_option: {
              //   //   text: {
              //   //     type: "plain_text",
              //   //     text: `${process.env.JIRA_AUTH_USER}`, // retrieve from DB
              //   //     emoji: true
              //   //   },
              //   //   value: savedProject
              //   // }
              // },
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: 'Add another',
                  emoji: true,
                },
                value: 'add_another_project_to_channel',
                action_id: 'add:project_to_channel',
              },
            ],
          },
        ],
      },
    })
  } catch (error) {
    console.log(error)
  }
}
