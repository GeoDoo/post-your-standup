require('module-alias/register')

const { TEXT, SCOPES, REDIRECT_URI } = require('@root/constants')
const expressReceiver = require('@root/app')

const expressApp = expressReceiver.app

expressReceiver.router.get('/install-url', (_req, res) => {
  console.log(expressReceiver.installer)

  const installUrl =
    expressReceiver.installer &&
    expressReceiver.installer.generateInstallUrl({
      scopes: [
        SCOPES.GROUPS,
        SCOPES.CHANNELS,
        SCOPES.CHAT,
        SCOPES.COMMANDS,
        SCOPES.WEBHOOK,
      ],
      redirectUri: REDIRECT_URI,
    })
  res.send({ installUrl })
})
;(async () => {
  expressApp.listen(process.env.PORT || 3000, () =>
    console.log(TEXT.APPS.MESSAGES.BOLT),
  )
})()
