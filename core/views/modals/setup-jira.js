const {
  getPlainTextBlock,
  getSectionBlock,
  getDividerBlock,
  getInputBlock,
} = require('@core/blocks')

module.exports = app => async ({ ack, body, context }) => {
  ack()

  try {
    await app.client.views.open({
      token: context.botToken,
      trigger_id: body.trigger_id,
      view: {
        type: 'modal',
        callback_id: 'authenticate_me_view',
        title: getPlainTextBlock('Setup Jira REST API'),
        submit: getPlainTextBlock('Submit'),
        blocks: [
          getSectionBlock(
            'This app needs a valid Jira account to access your data from your Jira projects. Please provide us with one below:',
          ),
          getInputBlock(
            'jira_email',
            'email',
            'Email for basic authentication to access Jira REST API',
            'Email',
            'Ideally this should be a dedicated Jira account in case, for example, the person behind the account leaves the company and someone deletes or deactivates his account',
          ),
          getInputBlock(
            'jira_token',
            'token',
            'Your Jira API token',
            'Token',
            'This should be a valid token for the previous account',
          ),
          getDividerBlock(),
          getSectionBlock(
            '_You can create a new token for your account <https://id.atlassian.com/manage-profile/security/api-tokens|here>_\n_For more info, please check <https://confluence.atlassian.com/cloud/api-tokens-938839638.html|here>_',
          ),
          getInputBlock(
            'jira_domain',
            'projectDomain',
            "Your company's Jira full domain",
            'Domain',
            'Example: https://myproject.atlassian.net/',
          ),
          getDividerBlock(),
          getSectionBlock(
            '*IMPORTANT NOTICE:* For security reasons, you will not be able to access the account details you entered after you click submit! If you want to change anything in the future, you will need to enter everything anew. Finally, we do not use your data for any other reason than to connect this app with your Jira boards :slightly_smiling_face:',
          ),
        ],
      },
    })
  } catch (error) {
    console.log(error)
  }
}
