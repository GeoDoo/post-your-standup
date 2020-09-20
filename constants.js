require('dotenv').config()

const JIRA_API_PATH = {
  SEARCH_USER: 'rest/api/3/user/search/query',
  SEARCH: 'rest/api/3/search',
}

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
      INTRO_AUTHENTICATED:
        ':tada:  ---  *Connection to Jira has already been successfully established*  ---  :tada:\n',
      CHANGE_ACCOUNT:
        '_If you wish to change Jira account though, you can setup a new one by clicking below:_\n',
    },
  },
  SETUP_JIRA: {
    TITLE: 'Connect to Jira',
    INTRO:
      'This app needs a valid Jira account to access your data from your Jira projects. Please provide us with one below:',
    EMAIL: {
      PLACEHOLDER: 'Email of your Jira account',
      LABEL: 'Email',
      HINT:
        'Ideally this should be a dedicated Jira account in case, for example, the person behind the account leaves the company and someone deletes or deactivates his account',
    },
    TOKEN: {
      PLACEHOLDER: 'Jira token',
      LABEL: 'Token',
      HINT: 'This should be a valid token for the previous account',
    },
    TOKEN_LINKS:
      '_You can create a new token for your account <https://id.atlassian.com/manage-profile/security/api-tokens|here>_\n_For more info, please check <https://confluence.atlassian.com/cloud/api-tokens-938839638.html|here>_',
    DOMAIN: {
      PLACEHOLDER: 'Your Jira full domain',
      LABEL: 'Domain',
      HINT: 'Example: https://myproject.atlassian.net',
    },
    NOTICE:
      '*IMPORTANT NOTICE:* For security reasons, you will not be able to access the account details you entered after you click submit! If you want to change anything in the future, you will need to enter everything anew. Finally, we do not use your data for any other reason than to connect our app with your Jira boards :slightly_smiling_face:',
  },
  BUTTONS: {
    CHANGE_ACCOUNT: 'Change Jira account',
    SUBMIT: 'Submit',
    CONNECT_TO_JIRA: 'Connect to Jira',
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
    HELP_TEXT_MATCH: 'help',
    STANDUP: {
      NO_ISSUES_FOUND: 'No issues found. All done here. Great job!',
      HELP:
        "> This app is relatively easy to use. It needs two pieces of information from you: your Jira email and your tickets' prefix. Easy peasy!\n An example can be: `/standup my.jira.email@company.com DSUS`\n _hint: if you have a ticket DSUS-1 or SMD-234, then DSUS and SMD are the prefixes_",
      INVALID_EMAIL:
        ":thinking_face: did you type your email correctly? Doesn't seem right to me! :smile:",
      NO_TEXT:
        ':thinking_face: did you forget to type your email or project prefix? We need both of them! :slightly_smiling_face:',
      NO_USER:
        ':sob: we could not match your email or project! Are you absolutely certain you typed your Jira email AND project correctly? Please try again, thanks! :slightly_smiling_face:',
    },
  },
}

const ALGORITHM = {
  /**
   * GCM is an authenticated encryption mode that
   * not only provides confidentiality but also
   * provides integrity in a secured way
   * */
  BLOCK_CIPHER: 'aes-256-gcm',

  /** 128 bit auth tag is recommended for GCM */
  AUTH_TAG_BYTE_LEN: 16,

  /**
   * NIST recommends 96 bits or 12 bytes IV for GCM
   * to promote interoperability, efficiency, and
   * simplicity of design
   */
  IV_BYTE_LEN: 12,

  /**
   * Note: 256 (in algorithm name) is key size.
   * Block size for AES is always 128
   */
  KEY_BYTE_LEN: 32,

  /** To prevent rainbow table attacks */
  SALT_BYTE_LEN: 16,
}

module.exports = {
  JIRA_API_PATH,
  COMMANDS,
  EVENTS,
  ACTIONS,
  VIEWS,
  SCOPES,
  TEXT,
  ALGORITHM,
}
