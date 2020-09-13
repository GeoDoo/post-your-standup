require('dotenv').config()

const COMMANDS = {
  STANDUP: process.env.COMMAND,
}

const EVENTS = {
  APP_HOME_VIEWED: 'app_home_opened',
}

const ACTIONS = {
  OPEN_SETUP_JIRA_MODAL: 'open_setup_jira_modal',
}

const VIEWS = {
  HOME_VIEW: 'home_view',
  HOME_AUTHENTICATED_VIEW: 'authenticated_view',
}

module.exports = {
  COMMANDS,
  EVENTS,
  ACTIONS,
  VIEWS,
}
