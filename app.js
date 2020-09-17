const { App, ExpressReceiver } = require('@slack/bolt')
const standup = require('@core/chat/commands/standup')
const home = require('@core/views/home')
const setupJira = require('@core/views/modals/setup-jira')
const homeAuthenticated = require('@core/views/home_authenticated')
const { EVENTS, ACTIONS, VIEWS, COMMANDS } = require('@root/constants')
const { getConnection } = require('@db')
const { storeInstallation, fetchInstallation } = require('@db/models/Auth')
const { v4: uuidv4 } = require('uuid')

const db = getConnection()
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

require('dotenv').config()

const expressReceiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
})

const app = process.env.LOCAL_DEV
  ? new App({
      token: process.env.SLACK_BOT_TOKEN,
      receiver: expressReceiver,
    })
  : new App({
      clientId: process.env.SLACK_CLIENT_ID,
      clientSecret: process.env.SLACK_CLIENT_SECRET,
      stateSecret: uuidv4(),
      scopes: [
        'channels:read',
        'chat:write',
        'commands',
        'groups:read',
        'incoming-webhook',
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
            const { installation } = await fetchInstallation(teamId)
            return installation
          } catch (e) {
            console.log(e)
          }
        },
      },
      receiver: expressReceiver,
    })

const expressApp = expressReceiver.app

app.command(COMMANDS.STANDUP, standup(app))

app.event(EVENTS.APP_HOME_VIEWED, home(app))

app.action(ACTIONS.OPEN_SETUP_JIRA_MODAL, setupJira(app))

app.view(VIEWS.HOME_AUTHENTICATED_VIEW, homeAuthenticated(app))

module.exports = expressApp
