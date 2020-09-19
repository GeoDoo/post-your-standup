require('module-alias/register')

const { TEXT } = require('@root/constants')
const expressApp = require('@root/app')

;(async () => {
  expressApp.listen(process.env.PORT || 3000, () =>
    console.log(TEXT.APPS.MESSAGES.BOLT),
  )
})()
