require('dotenv').config()

const COMMANDS = {
  STANDUP: process.env.COMMAND,
}

const EVENTS = {
  APP_HOME_VIEWED: 'app_home_opened',
}

const ACTIONS = {
  OPEN_SETUP_JIRA_MODAL: 'open:setup:jira:modal',
  CHANNEL_SELECTION: 'channel:selection',
  PROJECT_SELECTION: 'project:selection',
}

const VIEWS = {
  LALA_VIEW: 'lala_view',
}

module.exports = {
  COMMANDS,
  EVENTS,
  ACTIONS,
  VIEWS,
}
