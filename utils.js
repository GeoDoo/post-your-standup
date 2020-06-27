const btoa = () =>
  Buffer.from(
    `${process.env.JIRA_AUTH_USER}:${process.env.JIRA_API_TOKEN}`
  ).toString("base64");

module.exports = { btoa };
