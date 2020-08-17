require('module-alias/register')

const expressApp = require('@root/app')

;(async () => {
  expressApp.listen(process.env.PORT || 3000, () =>
    console.log('⚡️ Bolt app is running!'),
  )
})()
