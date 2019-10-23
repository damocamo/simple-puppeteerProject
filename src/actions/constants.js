let config = require('konfig')({
  path: './src/config'
})

/*
  Uses all the configuration properties and sets them 
*/
module.exports = {
  pageTimeout: config.properties.pageTimeout,
  waitTime: config.properties.waitTime,
  headlessMode: config.properties.headlessMode,
  devtools: config.properties.devtools,
  user: config.properties.user,
  width: config.properties.width,
  height: config.properties.height,
  stepScreenshot: config.properties.stepScreenshot,
  clearReports: config.properties.clearReports,
  launchReport: config.properties.launchReport,
  consoleLogs: config.properties.consoleLogs,
  chromiumPath: config.properties.chromiumPath,
}