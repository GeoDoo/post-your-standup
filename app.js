const { App, ExpressReceiver } = require('@slack/bolt')
const standup = require('./commands/standup')
const onAppHomeOpened = require('./events/app-home-opened')
const setupJira = require('./actions/open-setup-jira-modal')
const selectChannel = require('./actions/channel-selection')
const selectProject = require('./actions/project-selection')
const lala = require('./views/lala')
const { EVENTS, ACTIONS, VIEWS, COMMANDS } = require('./constants')
const { getConnection } = require('./db')

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

app.event(EVENTS.APP_HOME_VIEWED, onAppHomeOpened(app))

app.action(ACTIONS.OPEN_SETUP_JIRA_MODAL, setupJira(app))
app.action(ACTIONS.CHANNEL_SELECTION, selectChannel(app))
app.action(ACTIONS.PROJECT_SELECTION, selectProject(app))

app.view(VIEWS.LALA_VIEW, lala(app))

module.exports = expressApp
