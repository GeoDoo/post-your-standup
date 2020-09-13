const { App, ExpressReceiver } = require('@slack/bolt')
const standup = require('@core/chat/commands/standup')
const home = require('@core/views/home')
const setupJira = require('@core/views/modals/setup-jira')
const authenticated = require('@core/views/authenticated')
const { EVENTS, ACTIONS, VIEWS, COMMANDS } = require('@root/constants')
const { getConnection } = require('@db')

const db = getConnection()
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

require('dotenv').config()

const expressReceiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
})

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: expressReceiver,
})

const expressApp = expressReceiver.app

app.command(COMMANDS.STANDUP, standup(app))

app.event(EVENTS.APP_HOME_VIEWED, home(app))

app.action(ACTIONS.OPEN_SETUP_JIRA_MODAL, setupJira(app))

app.view(VIEWS.AUTHENTICATED_VIEW, authenticated(app))

module.exports = expressApp
