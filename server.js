const expressApp = require("./app");

(async () => {
  // Start your app
  expressApp.listen(process.env.PORT || 3000, () =>
    console.log("⚡️ Bolt app is running!")
  );
})();
