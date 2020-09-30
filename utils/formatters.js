const moment = require('moment')
const { TEXT } = require('../constants')

const formatIssues = (data, projectUrl) => {
  if (!data || !data.length) return TEXT.COMMANDS.STANDUP.NO_ISSUES_FOUND

  return data
    .map(
      (issue, index) =>
        `${index + 1}.  <${projectUrl}/browse/${issue.key}|${
          issue.fields.summary
        }>, *${issue.fields.status.name}*, _Last updated ${moment(
          issue.fields.updated,
        ).fromNow()}_\n`,
    )
    .join('')
}

const today = () => moment().format('DD-MM-YYYY')

module.exports = { formatIssues, today }
