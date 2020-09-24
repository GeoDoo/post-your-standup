require('dotenv').config({ path: __dirname + '/../.env' })
const { exec } = require('child_process')
const fs = require('fs')
const path = require('path')

const backup = path => {
  if (!path) {
    console.error('Usage:\tnode db.js /path/to/store/backup/file')
    process.exit(1)
  }

  const fileName = `${path}/${new Date()
    .toISOString()
    .replace(/T/, '_')
    .replace(/\..+/, '')}_standup_db_backup.archive`

  const command =
    'docker exec standup-mongo-db sh -c ' +
    '"exec mongodump -u ' +
    process.env.DB_USERNAME +
    ' -p ' +
    process.env.DB_PASSWORD +
    ' -d ' +
    process.env.DB_NAME +
    ' --archive"' +
    '>' +
    fileName

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(err)
    } else {
      console.log(`stdout: ${stdout}`)
      console.log(`stderr: ${stderr}`)
    }
  })
}

const deleteOldBackups = filePath => {
  if (!filePath) {
    console.error('Usage:\tnode db.js /path/to/store/backup/file')
    process.exit(1)
  }

  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.log(err)
      return
    }

    files.forEach(fileName => {
      if (!fileName.includes('.archive')) {
        return
      }

      fs.stat(path.join(filePath, fileName), function (err, stat) {
        if (err) {
          return console.error(err)
        }

        const now = new Date().getTime()
        const endTime = new Date(stat.ctime).getTime() + 604800000

        if (now > endTime) {
          return fs.unlink(path.join(filePath, fileName), function (err) {
            if (err) {
              return console.error(err)
            }
            console.log('successfully deleted')
          })
        }
      })
    })
  })
}

module.exports = { backup, deleteOldBackups }
