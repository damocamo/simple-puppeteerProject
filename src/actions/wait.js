const constants = require('../actions/constants')

// Copied function 
async function elementToHaveAttributeValue(page, elementHandle, attributeName, attributeValue) {

  const started = Date.now()

  return new Promise((resolve, reject) => {
    let interval = setInterval(() => {
      console.log('start setInterval')
      if (Date.now() - started > 15000) {
        clearInterval(interval)
        return reject('Timed out: element did not have attribute value')
      } else {
        console.log('page.evaluate')
        return page.evaluate((elementHandle, attributeName, attributeValue) => {
            return elementHandle.getAttribute(attributeName).indexOf(attributeValue) !== -1
          }, elementHandle, attributeName, attributeValue)
          .then((hasClass) => {
            if (hasClass) {
              clearInterval(interval)
              return resolve('it worked')
            }
          })
      }
    }, 100)
  })
}

/*
Used to wait until an element is visable, returns the eventHandeler if found 
*/
async function elementVisible(page, cssSelector) {
  return await page.waitForSelector(cssSelector, {
    timeout: constants.pageTimeout,
    visible: true
  })
}

/*
Used to wait until an element is visable, returns the eventHandeler if found 
*/
async function elementXpathVisible(page, xpathSelector) {
  return await page.waitForXPath(xpathSelector, {
    timeout: constants.pageTimeout,
    visible: true
  })
}

/*
Used to wait until an element is no longer visable, returns the eventHandeler
if found
*/
async function elementNotVisible(page, cssSelector) {
  return await page.waitForSelector(cssSelector, {
    timeout: constants.pageTimeout,
    hidden: true,
    visible: false
  })
}

async function wait(page) {
  return page.waitFor(constants.waitTime)
}

module.exports = {
  elementToHaveAttributeValue,
  elementVisible,
  elementNotVisible,
  elementXpathVisible,
  wait
}