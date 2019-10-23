const find = require('./find')

/*
  Fills in a field given the inputs 
*/
async function fill(page, fieldLabel, value, elementHandle) {
  const field = await find.textFieldWithLabel(page, fieldLabel, elementHandle)
  await field.focus()
  await field.type(value)
  await page.keyboard.press('Tab')
}

/*
Clears a field that has a label manually by pressing backspace
*/
async function clear(page, fieldLabel, elementHandle) {
  const field = await find.textFieldWithLabel(page, fieldLabel, elementHandle)
  await field.focus()

  const inputValue = await (await field.getProperty('value')).jsonValue()
  //console.log(inputValue)
  // const inputValue = await page.$eval('#email-input', el => el.value);
  for (let i = 0; i < inputValue.length; i++) {
    await page.keyboard.press('Backspace');
  }

}


/*
Clears the field value - We assume that the current field element is in focus 
*/
async function clearFieldContent(page, fieldValue) {
  for (let i = 0; i < fieldValue.length; i++) {
    await page.keyboard.press('Backspace');
  }
}

/*
Clears a field label manually by pressing backspace
*/
async function clearTextSelector(page, selector, elementHandle) {
  let field
  if (elementHandle != null) {
    field = await elementHandle.$(selector)
  } else
    field = await page.$(selector)
  const inputValue = await find.elementText(page, selector)
  //console.log(inputValue)
  for (let i = 0; i < inputValue.length; i++) {
    await field.focus()
    await field.press('Delete');
  }

}

/*
Clears a field manually by pressing backspace
*/
async function clearText(page, selector, elementHandle) {
  let field
  if (elementHandle != null) {
    field = await elementHandle.$(selector)
  } else
    field = await page.$(selector)
  const inputValue = await getValue(page, selector)
  //console.log(inputValue)
  for (let i = 0; i < inputValue.length; i++) {
    await field.focus()
    await page.keyboard.press('Backspace');
  }

}

/*
Returns the value of the given field that has a label
*/
async function getValueLabel(page, fieldLabel) {
  const field = await find.textFieldWithLabel(page, fieldLabel)
  const getValue = await (await field.getProperty('value')).jsonValue()
  return getValue
}

/*
Returns the value of the given field
*/
async function getValue(page, selector) {
  const field = await page.$(selector)
  const getValue = await (await field.getProperty('value')).jsonValue()
  return getValue
}




module.exports = {
  fill,
  clear,
  clearFieldContent,
  getValueLabel,
  getValue,
  clearTextSelector,
  clearText
}