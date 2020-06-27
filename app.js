const { App, ExpressReceiver } = require("@slack/bolt");
const dotenv = require("dotenv");

const standupCommand = require("./commands/standup");
const appHomeOpenedEvent = require("./events/app-home-opened");
const openSetupJiraModalEvent = require("./actions/open-setup-jira-modal");
const channelSelectionEvent = require("./actions/channel-selection");
const projectSelectionEvent = require("./actions/project-selection");
const lalaView = require("./views/lala");

dotenv.config();

const expressReceiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: expressReceiver,
});

const expressApp = expressReceiver.app;

app.command("/standup", standupCommand(app));

app.event("app_home_opened", appHomeOpenedEvent(app));

app.action("open:setup:jira:modal", openSetupJiraModalEvent(app));
app.action("channel:selection", channelSelectionEvent(app));
app.action("project:selection", projectSelectionEvent(app));

app.view("lala_view", lalaView(app));

module.exports = expressApp;
