const moment = require('moment')
const { TEXT } = require('../constants')

const formatIssues = (data, projectUrl) => {
  if (!data || !data.length) return TEXT.COMMANDS.STANDUP.NO_ISSUES_FOUND

  return data
    .map(
      (issue, index) =>
        `${index + 1}.  ${issue.fields.summary}\n
      Link: ${projectUrl}/browse/${issue.key}\n
      Status: *${issue.fields.status.name}*\n
      _Last updated ${moment(issue.fields.updated).fromNow()}_\n`,
    )
    .join('')
}

const today = () => moment().format('DD-MM-YYYY')

module.exports = { formatIssues, today }
