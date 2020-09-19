require('module-alias/register')

const { TEXT, SCOPES } = require('@root/constants')
const expressReceiver = require('@root/app')

const expressApp = expressReceiver.app

expressReceiver.router.get('/install-url', async (_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')

  try {
    const installUrl =
      expressReceiver.installer &&
      (await expressReceiver.installer.generateInstallUrl({
        scopes: [
          SCOPES.GROUPS,
          SCOPES.CHANNELS,
          SCOPES.CHAT,
          SCOPES.COMMANDS,
          SCOPES.WEBHOOK,
        ],
      }))
    res.send({ installUrl })
  } catch (e) {
    console.error(e)
    next(e)
  }
})
;(async () => {
  expressApp.listen(process.env.PORT || 3000, () =>
    console.log(TEXT.APPS.MESSAGES.BOLT),
  )
})()
