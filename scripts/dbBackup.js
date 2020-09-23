require('dotenv').config({ path: __dirname + '/../.env' })

const { exec } = require('child_process')

const args = process.argv.slice(2)
if (!args[0]) {
  console.error('Usage:\tdbnode Backup.jd /path/to/store/backup/file')
  process.exit(1)
}

const fileName = `${args[0]}/${new Date()
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
