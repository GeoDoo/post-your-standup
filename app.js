const { App } = require("@slack/bolt");
const fetch = require("node-fetch");
const moment = require("moment");
const sqlite3 = require("sqlite3").verbose();
const dotenv = require("dotenv");

dotenv.config();

let db = new sqlite3.Database("./app.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
});

// TODO: setup DB elsewhere
// db.run("CREATE TABLE projects(name text)");

let savedProject;
db.get(
  `SELECT name FROM projects WHERE name = ?`,
  [`${process.env.PROJECT}`],
  (err, row) => {
    if (err) {
      throw err;
    }

    if (row) {
      savedProject = row.name;
      console.log("inside", savedProject);
    }
  }
);

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const btoa = () =>
  Buffer.from(
    `${process.env.JIRA_AUTH_USER}:${process.env.JIRA_API_TOKEN}`
  ).toString("base64");

const formatIssues = (data) => {
  if (!data || !data.length) return "No issues found. All done here!";

  return data
    .map(
      (issue, index) =>
        `${index + 1}.  ${issue.fields.summary}\n
      Link: ${process.env.BASE_URL}/browse/${issue.key}\n
      Status: *${issue.fields.status.name}*\n
      _Last updated ${moment(issue.fields.updated).fromNow()}_\n`
    )
    .join("");
};

app.command("/standup", async ({ ack, payload, context }) => {
  ack();

  let additionalTasks;
  const userText = payload.text.trim();

  if (userText && userText === "help") {
    try {
      return await app.client.chat.postMessage({
        token: context.botToken,
        channel: payload.channel_id,
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text:
                "> This app is relatively easy to use. Just hit the command.\n _For example:_ `/standup`",
            },
          },
        ],
        text: "Message from Post Your Standup App",
      });
    } catch (error) {
      console.log(error);
      return;
    }
  } else {
    const tasks = userText
      ? userText.split(",").map((task) => task.trim())
      : [];
    additionalTasks = tasks.length
      ? tasks.map((task) => `•  ${task}\n`).join("")
      : "";
  }

  const token = btoa();
  // TODO: columns need to be user selected from Home settings
  const jql = `project=${process.env.PROJECT} AND assignee=currentuser() AND status IN ("Dev Prioritised")`;

  try {
    const results = await fetch(
      `${process.env.BASE_URL}/rest/api/2/search?jql=${jql}`,
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      }
    );
    const { issues } = await results.json();
    const blocks = [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `> *@${
            payload.user_name
          }'s standup for today, ${moment().format("DD-MM-YYYY")}*`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Jira tickets currently working on:",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `${formatIssues(issues.slice(0, 16))}`, // limit to 16 issues = 2845 chars, due to invalid_blocks error: max length 3001 chars
        },
      },
    ];

    if (additionalTasks) {
      blocks.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Additional tasks:\n${additionalTasks}`,
        },
      });
    }

    await app.client.chat.postMessage({
      token: context.botToken,
      channel: payload.channel_id,
      blocks,
      text: "Message from Post Your Standup App",
    });
  } catch (error) {
    console.log(error);
    console.log(error.data.response_metadata.messages);
  }
});

app.event("app_home_opened", async ({ event, context }) => {
  try {
    await app.client.views.publish({
      token: context.botToken,
      user_id: event.user,
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
              text: "Setup basic authentication for your Jira projects\n",
            },
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "Authenticate me",
                  emoji: true,
                },
                action_id: "open:setup:jira:modal",
              },
            ],
          },
        ],
      },
    });
  } catch (error) {
    console.error(error.data.response_metadata);
  }
});

app.action("open:setup:jira:modal", async ({ ack, body, context }) => {
  ack();

  try {
    await app.client.views.open({
      token: context.botToken,
      trigger_id: body.trigger_id,
      view: {
        type: "modal",
        callback_id: "lala_view",
        title: {
          type: "plain_text",
          text: "Setup Jira REST API",
        },
        submit: {
          type: "plain_text",
          text: "Submit",
        },
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text:
                "This app needs a valid Jira account to access your data from your Jira projects. Please provide us with one below:",
            },
          },
          {
            type: "input",
            block_id: "jira_email",
            element: {
              type: "plain_text_input",
              action_id: "email",
              placeholder: {
                type: "plain_text",
                text: "Email for basic authentication to access Jira REST API",
              },
            },
            label: {
              type: "plain_text",
              text: "Email",
            },
            hint: {
              type: "plain_text",
              text:
                "Ideally this should be a dedicated Jira account in case, for example, the person behind the account leaves the company and someone deletes or deactivates his account",
            },
          },
          {
            type: "input",
            block_id: "jira_token",
            element: {
              type: "plain_text_input",
              action_id: "token",
              placeholder: {
                type: "plain_text",
                text: "Your Jira API token",
              },
            },
            label: {
              type: "plain_text",
              text: "Token",
            },
            hint: {
              type: "plain_text",
              text: "This should be a valid token for the previous account",
            },
          },
          {
            type: "divider",
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text:
                "_You can create a new token for your account <https://id.atlassian.com/manage-profile/security/api-tokens|here>_\n_For more info, please check <https://confluence.atlassian.com/cloud/api-tokens-938839638.html|here>_",
            },
          },
          {
            type: "input",
            block_id: "jira_domain",
            element: {
              type: "plain_text_input",
              action_id: "projectDomain",
              placeholder: {
                type: "plain_text",
                text: "Your company's Jira domain",
              },
            },
            label: {
              type: "plain_text",
              text: "Domain",
            },
            hint: {
              type: "plain_text",
              text: "Example: myproject from https://myproject.atlassian.net/",
            },
          },
          {
            type: "divider",
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text:
                "*IMPORTANT NOTICE:* For security reasons, you will not be able to access this modal after you click submit! If you want to change anything in the future, you will need to enter everything anew.",
            },
          },
        ],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

app.action("project:selection", async ({ ack, body, context }) => {
  ack();

  console.log("project:selection", body);

  const selectedProject = body.actions[0].selected_option.value; // save to DB

  // db.run("INSERT INTO projects(name) VALUES (?)", selectedProject, function(err) {
  //   if (err) {
  //     return console.error(err.message);
  //   }
  //   console.log(`Rows inserted ${this.changes}`);
  // });

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
                action_id: "open:setup:jira:modal",
              },
            ],
          },
          {
            type: "actions",
            elements: [
              {
                type: "static_select",
                action_id: "channel:selection",
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
                action_id: "project:selection",
                placeholder: {
                  type: "plain_text",
                  text: "Select your project",
                  emoji: true,
                },
                options: projectSelectOptions,
                initial_option: {
                  text: {
                    type: "plain_text",
                    text: `${process.env.JIRA_AUTH_USER}`, // retrieve from DB
                    emoji: true,
                  },
                  value: savedProject,
                },
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
});

app.action("channel:selection", async ({ ack, body, context }) => {
  ack();

  console.log("channel:selection", body);

  // const selectedProject = body.actions[0].selected_option.value; // save to DB

  // db.run("INSERT INTO projects(name) VALUES (?)", selectedProject, function(err) {
  //   if (err) {
  //     return console.error(err.message);
  //   }
  //   console.log(`Rows inserted ${this.changes}`);
  // });

  try {
    // // Update the message
    // const result = await app.client.chat.update({
    //   token: context.botToken,
    //   // ts of message to update
    //   ts: body.message.ts,
    //   // Channel of message
    //   channel: body.channel.id,
    //   blocks: [
    //     {
    //       type: 'section',
    //       text: {
    //         type: 'mrkdwn',
    //         text: '*The button was clicked!*'
    //       }
    //     }
    //   ],
    //   text: 'Message from Test App'
    // });
    // console.log(result);
  } catch (error) {
    console.error(error);
  }
});

app.view("lala_view", async ({ ack, body, view, context }) => {
  ack();

  // console.log("YAYAYAYAYAYAYAY", body);
  // console.log(view.state.values);
  const jiraEmail = view.state.values.jira_email.email.value.trim();
  const jiraToken = view.state.values.jira_token.token.value.trim();
  const jiraProjectDomain = view.state.values.jira_domain.projectDomain.value.trim();

  // console.log(jiraEmail, jiraToken, jiraProjectDomain);
  // console.log(body);
  // console.log(view);

  try {
    const token = btoa();
    const results = await fetch(`${process.env.BASE_URL}/rest/api/2/project`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
    const projects = await results.json();
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
                "Basic authentication has already been successfully set up. Congrats!\nIf you wish to change Jira account though, you can set a new one by clicking below:\n",
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
                action_id: "open:setup:jira:modal",
              },
            ],
          },
          {
            type: "actions",
            elements: [
              {
                type: "static_select",
                action_id: "channel:selection",
                placeholder: {
                  type: "plain_text",
                  text: "Select a channel",
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
                type: "static_select",
                action_id: "project:selection",
                placeholder: {
                  type: "plain_text",
                  text: "Select your project",
                  emoji: true,
                },
                options: projectSelectOptions,
                initial_option: {
                  text: {
                    type: "plain_text",
                    text: `${process.env.JIRA_AUTH_USER}`, // retrieve from DB
                    emoji: true,
                  },
                  value: savedProject,
                },
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
    console.log(error);
  }
});

// TODO: fix this
// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }

  console.log("Close the database connection.");
});

// TODO: now migrating fully to an express app we need endpoints like /slack/events

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
