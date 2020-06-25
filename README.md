### Steps to run the app

1. `npm install` and `npm start` to run the app locally
2. You will need a public URL. Try exposing your localhost with [ngrok.com](https://ngrok.com/). When you have it, you will need to change the URL on the slack app settings under Events subscriptions page to point to yours (this is not convenient, but we currently don't have a proper host for the app). For local development I guess it will do for now :smile
3. [Join geodoo Slack workspace](https://join.slack.com/t/geodoo/shared_invite/zt-fcn7iygw-F05NMjqmv42GTh6TRKTBOA)
4. You will need certain env variables to setup the project
5. You will need an Atlassian account of course and an API token for your account for basic authentication. Check: https://confluence.atlassian.com/cloud/api-tokens-938839638.html

### Example .env file
```
SLACK_BOT_TOKEN=<from slack app>
SLACK_SIGNING_SECRET=<from slack app>
JIRA_AUTH_USER=<basic auth for Jira>
JIRA_API_TOKEN=<basic auth for Jira>
BASE_URL=<this is provisional here: it will be provided by users>
PROJECT=<this is provisional here: it will be provided by users>
```

### Issues
Please create an issue if you have any problems or want to ask a question about development etc.

### Useful links
1. https://github.com/slackapi/bolt-js
2. https://slack.dev/bolt-js/tutorial/getting-started
3. https://api.slack.com/start/building