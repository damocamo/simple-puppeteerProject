const constants = require('./constants')

function log(comment) {
    if (constants.consoleLogs) {
        console.log(comment)
    }
}

module.exports = {
    log,
};