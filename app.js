require('dotenv').config()

const { App, ExpressReceiver } = require('@slack/bolt')
const standup = require('@core/chat/commands/standup')
const home = require('@core/views/home')
const setupJira = require('@core/views/modals/setup-jira')
const homeAuthenticated = require('@core/views/home_authenticated')
const {
  EVENTS,
  ACTIONS,
  VIEWS,
  COMMANDS,
  SCOPES,
  TEXT,
} = require('@root/constants')
const { getConnection } = require('@db')
const { storeInstallation, fetchInstallation } = require('@db/models/Auth')
const { v4: uuidv4 } = require('uuid')

const db = getConnection()
db.on('error', console.error.bind(console, TEXT.DB.MESSAGES.GENERIC_ERROR))

const expressReceiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: uuidv4(),
  scopes: [
    SCOPES.GROUPS,
    SCOPES.CHANNELS,
    SCOPES.CHAT,
    SCOPES.COMMANDS,
    SCOPES.WEBHOOK,
  ],
  installationStore: {
    storeInstallation: async installation => {
      try {
        return await storeInstallation(installation.team.id, installation)
      } catch (e) {
        console.log(e)
      }
    },
    fetchInstallation: async ({ teamId }) => {
      try {
        return await fetchInstallation(teamId)
      } catch (e) {
        console.log(e)
      }
    },
  },
})

try {
  const app = new App({
    receiver: expressReceiver,
  })

  app.command(COMMANDS.STANDUP, standup(app))

  app.event(EVENTS.APP_HOME_VIEWED, home(app))

  app.action(ACTIONS.OPEN_SETUP_JIRA_MODAL, setupJira(app))

  app.view(VIEWS.HOME_AUTHENTICATED_VIEW, homeAuthenticated(app))
} catch (e) {
  console.error(e)
}

module.exports = expressReceiver
