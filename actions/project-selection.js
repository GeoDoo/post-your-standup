const fetch = require("node-fetch");
const { btoa } = require("../utils");
const { ACTIONS } = require("../constants");

module.exports = (app) => async ({ ack, body, context }) => {
  ack();

  console.log("project:selection", body);

  const selectedProject = body.actions[0].selected_option.value; // save to DB

  try {
    const token = btoa();
    const results = await fetch(
      `${process.env.BASE_URL}/rest/api/2/project/${selectedProject}/statuses`,
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      }
    );
    const [statusesForSelectedProject] = await results.json();
    const statusOptionsForSelectedProject = statusesForSelectedProject.statuses
      .sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
      .map((status) => ({
        text: {
          type: "plain_text",
          text: status.name,
          emoji: true,
        },
        value: status.name,
      }));

    const resultss = await fetch(`${process.env.BASE_URL}/rest/api/2/project`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
    const projects = await resultss.json();
    const projectSelectOptions = projects
      .sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
      .map((project) => ({
        text: {
          type: "plain_text",
          text: `${project.name} (${project.key})`,
          emoji: true,
        },
        value: project.key,
      }));
    const result = await app.client.conversations.list({
      token: process.env.SLACK_BOT_TOKEN,
      exclude_archived: true,
      types: "public_channel,private_channel", // magic
    });
    const allChannelsOptions = result.channels.map((channel) => ({
      text: {
        type: "plain_text",
        text: channel.name,
        emoji: true,
      },
      value: channel.name,
    }));

    await app.client.views.publish({
      token: context.botToken,
      user_id: body.user.id,
      view: {
        type: "home",
        callback_id: "home_view",
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*Welcome to your _Post Your Standup_ app*",
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text:
                "Our app enables teams to collaborate more efficiently by posting their standups for a Jira project to their dedicated channels.\nMake your project manager happy, team! :tada::tada::tada:\n",
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "\n",
            },
          },
          {
            type: "divider",
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: ":gear: *Settings*\n",
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text:
                "Basic authentication has already been successfully set up. Congrats!\nIf you wish to change Jira account though, you can set a new one by clicking below\n",
            },
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "Change Jira account",
                  emoji: true,
                },
                action_id: ACTIONS.OPEN_SETUP_JIRA_MODAL,
              },
            ],
          },
          {
            type: "actions",
            elements: [
              {
                type: "static_select",
                action_id: ACTIONS.CHANNEL_SELECTION,
                placeholder: {
                  type: "plain_text",
                  text: "Select a channel",
                  emoji: true,
                },
                options: allChannelsOptions,
                // leave for reference, we ll need to show the initial value from the DB
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
                type: "static_select",
                action_id: ACTIONS.PROJECT_SELECTION,
                placeholder: {
                  type: "plain_text",
                  text: "Select your project",
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
              {
                type: "static_select",
                action_id: "column:selection",
                placeholder: {
                  type: "plain_text",
                  text: "Select a board column",
                  emoji: true,
                },
                options: statusOptionsForSelectedProject,
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
                type: "button",
                text: {
                  type: "plain_text",
                  text: "Add another",
                  emoji: true,
                },
                value: "add_another_project_to_channel",
                action_id: "add:project_to_channel",
              },
            ],
          },
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
};
