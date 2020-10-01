const { VIEWS, TEXT } = require('@root/constants')
const {
  getPlainTextBlock,
  getSectionBlock,
  getDividerBlock,
  getInputBlock,
} = require('@core/blocks')
const { storeError } = require('@db/models/Logger')

module.exports = app => async ({ ack, body, context }) => {
  ack()

  try {
    await app.client.views.open({
      token: context.botToken,
      trigger_id: body.trigger_id,
      view: {
        type: 'modal',
        callback_id: VIEWS.HOME_AUTHENTICATED_VIEW,
        title: getPlainTextBlock(TEXT.SETUP_JIRA.TITLE),
        submit: getPlainTextBlock(TEXT.BUTTONS.SUBMIT),
        blocks: [
          getSectionBlock(TEXT.SETUP_JIRA.INTRO),
          getInputBlock(
            'jira_email',
            'email',
            TEXT.SETUP_JIRA.EMAIL.PLACEHOLDER,
            TEXT.SETUP_JIRA.EMAIL.LABEL,
            TEXT.SETUP_JIRA.EMAIL.HINT,
          ),
          getInputBlock(
            'jira_token',
            'token',
            TEXT.SETUP_JIRA.TOKEN.PLACEHOLDER,
            TEXT.SETUP_JIRA.TOKEN.LABEL,
            TEXT.SETUP_JIRA.TOKEN.HINT,
          ),
          getDividerBlock(),
          getSectionBlock(TEXT.SETUP_JIRA.TOKEN_LINKS),
          getInputBlock(
            'jira_domain',
            'projectDomain',
            TEXT.SETUP_JIRA.DOMAIN.PLACEHOLDER,
            TEXT.SETUP_JIRA.DOMAIN.LABEL,
            TEXT.SETUP_JIRA.DOMAIN.HINT,
          ),
          getDividerBlock(),
          getSectionBlock(TEXT.SETUP_JIRA.NOTICE),
        ],
      },
    })
  } catch (e) {
    console.error(e)
    await storeError(e)
  }
}
