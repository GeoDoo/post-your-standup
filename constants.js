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
  HOME_AUTHENTICATED_VIEW: 'home_authenticated_view',
}

const SCOPES = {
  GROUPS: 'groups:read',
  CHANNELS: 'channels:read',
  CHAT: 'chat:write',
  COMMANDS: 'commands',
  WEBHOOK: 'incoming-webhook',
}

const TEXT = {
  HOME: {
    TITLE: '*Welcome to your _Post Your Standup_ app*',
    INTRO:
      "Our app enables teams to collaborate more efficiently by posting their stand-ups for their Jira projects to their dedicated channels.\nEspecially when you work remotely, sometimes it is tedious to open Jira and go through all members' tickets and start explaining what you did etc.\nNow, you can post your tickets on the channel and argue about them in one place!\nMake your project manager happy, team!\n",
    SETTINGS: {
      TITLE: ':gear: *Settings*\n',
      AUTHENTICATION_SUCCESS_MESSAGE:
        'Basic authentication has already been successfully set up :tada:\n',
      CHANGE_ACCOUNT:
        'If you wish to change Jira account though, you can set a new one by clicking below:\n',
    },
  },
  BUTTONS: {
    CHANGE_ACCOUNT: 'Change Jira account',
  },
  DB: {
    MESSAGES: {
      CONNECTION_SUCCESSFUL: 'Your connection with database was successful!',
      GENERIC_ERROR: 'MongoDB error: ',
    },
  },
  APPS: {
    MESSAGES: {
      BOLT: '⚡️ Bolt app is running!',
    },
  },
  COMMANDS: {
    STANDUP: {
      NO_ISSUES_FOUND: 'No issues found. All done here. Great job!',
    },
  },
}

module.exports = {
  COMMANDS,
  EVENTS,
  ACTIONS,
  VIEWS,
  SCOPES,
  TEXT,
}
