
const {
    When,
} = require('cucumber')
const scope = require('../actions/scope')
const utils = require('../actions/utils')
const logger = require('../actions/logger.js')
const wait = require('../actions/wait')

When('I set page to {string}', async function (page) {
    //Used for logging purpse (only if set)
    logger.log(`I click on ${page}`)
    let time = utils.getTime('DD-MM-YY HH:mm:ss')
    logger.log('Time: ' + time)
    this.attach('Running time: ' + time);

    scope.pageObject = page;
    await wait.wait(scope.page)

})