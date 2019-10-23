const chai = require('chai')
const utils = require('./utils')

/* 
Return the text of the element if found else return undefined 
*/
async function elementContainingText(page, cssSelector, text, elementNotExist, isVisable) {

  //Not always true if there are multuple elements aded input param to check
  if (isVisable) {
    await page.waitForSelector(cssSelector, {
      visible: true
    })
  }
  let strl = text.length
  const matchingElements = await page.$$(cssSelector)
  for (let matchingElement of matchingElements) {
    const matchingElementText = await page.evaluate(el => el.innerText, matchingElement)
    const otherElementValue = await getPropertyText(page, matchingElement, "value")
    // assumes that its visible via boxModel attributes 
    let isaBox = await matchingElement.boxModel()
    if (otherElementValue === text && isaBox) {
      await page.waitForSelector(cssSelector, {
        visible: true
      })
      return matchingElement
    }
    let splitText = matchingElementText.slice(0, strl)
    let removeSpaces = matchingElementText.trim()
    //get rid of spaces if there and then check button
    if (matchingElementText == text) {
      {
        return matchingElement
      }
    } else if (splitText == text) {
      await page.waitForSelector(cssSelector, {
        visible: true
      })
      return matchingElement
    } else if (removeSpaces == text) {
      await page.waitForSelector(cssSelector, {
        visible: true
      })
      return matchingElement
    }
  }
  if (!elementNotExist) {
    throw new Error(`Cannot find element containing: ${text}`)
  } else {
    return undefined
  }
}

async function elementWithText(page, cssSelector, text, elementNotExist) {

  await page.waitForSelector(cssSelector, {
    visible: true
  })
  let modal = await page.$(".modal")
  const matchingElements = await modal.$$(cssSelector)
  for (let matchingElement of matchingElements) {
    const matchingElementText = await page.evaluate(el => el.innerText, matchingElement)
    if (matchingElementText == text) {
      return matchingElement
    }
  }
  if (!elementNotExist) {
    throw new Error(`Cannot find element containing: ${text}`)
  } else {
    return undefined
  }
}

/*
Returns the inner text of an element using CSS selector
*/
async function elementText(page, cssSelector) {
  await page.waitFor(cssSelector)
  return await page.$eval(cssSelector, el => el.innerText)
}

/*
Returns the inner text of an element using the elementHandle
*/

async function elementTextHandle(elementHandle) {
  return await (await elementHandle.getProperty('textContent')).jsonValue();
}

/*
Returns the Element handler of the text field using label 
*/
async function textFieldWithLabel(page, label, elementHandle) {

  let matchingElements

  if (elementHandle != null) {
    matchingElements = await elementHandle.$$('label')
  } else
    matchingElements = await page.$$('label')
  let matchingLabelElement = null
  for (let matchingElement of matchingElements) {
    const matchingElementText = await page.evaluate(el => el.innerText, matchingElement)
    if (matchingElementText === label) {
      matchingLabelElement = matchingElement
    }
  }

  if (!matchingLabelElement) {
    throw new Error(`Cannot find label with text: ${label}`)
  }

  const labelForAttribute = await page.evaluate(matchingLabelElement => matchingLabelElement.getAttribute('for'), matchingLabelElement)
  return await page.$(`input[id=${labelForAttribute}]`)
}


/*
Returns the Element handler of the active tab
*/
async function getActiveTabProperty(page, elements, property, key) {
  for (let element of elements) {

    //let status = await (await element.getProperty(property)).jsonValue()
    let status = await getPropertyText(page, element, property)
    if (status == key) {
      return element
    }
  }
}

/*
Returns the text of a given property of a element handle,

*/
async function getPropertyText(page, element, property) {
  const matchingElementText = await page.evaluate((el, property) => el.getAttribute(property), element, property)
  return matchingElementText

}
/*
Returns text of a given selector and given attribute 
eg.getTextOfSelAttribute(page, '.logo', 'src');
*/
async function getTextOfSelAttribute(page, selector, attr) {
  return page.$eval(selector, (el, attribute) => el.getAttribute(attribute), attr)

}

/*
 * Given a selector and label return the element  
 */

async function getElmentLabel(page, selector, selectorText) {
  let elements = await page.$$(selector)
  for (let element of elements) {
    let elementItem = await elementTextHandle(element)
    if (elementItem === selectorText) {
      return element
    }
  }

  return undefined
}


module.exports = {
  elementContainingText,
  elementWithText,
  textFieldWithLabel,
  elementText,
  elementTextHandle,
  getActiveTabProperty,
  getPropertyText,
  getTextOfSelAttribute,
  getElmentLabel,

};