module.exports = (app) => async ({ ack, body, context }) => {
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
};
