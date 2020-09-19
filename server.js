require('module-alias/register')

const { TEXT } = require('@root/constants')
const expressReceiver = require('@root/app')

const expressApp = expressReceiver.app

expressReceiver.router.get('/install-url', (_req, res) => {
  const installUrl =
    expressReceiver.installer && expressReceiver.installer.generateInstallUrl()
  res.send({ installUrl })
})
;(async () => {
  expressApp.listen(process.env.PORT || 3000, () =>
    console.log(TEXT.APPS.MESSAGES.BOLT),
  )
})()
