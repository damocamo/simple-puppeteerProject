const path = require('path')
const wait = require('./wait')
const loader = require('../step_definitions/components/loading_select')

async function filesToUpload(page, dataTable, selector, filePath) {

    /*
    | fileName |
    | file1    |
    | file2    |
     */

    var fileNames = dataTable.hashes();
    var fileToUpload;
    var filesToUpload = '';

    fileNames.forEach(function (row, index) {
        fileToUpload = path.resolve(filePath + row.fileName);
        //console.log('fileToUpload : ' + fileToUpload);
        if (index <= (fileNames.length - 1) && fileNames.length > 1) {
            fileToUpload = path.resolve(filePath + row.fileName);
            if (filesToUpload === '') {
                filesToUpload = fileToUpload;
            } else {
                filesToUpload = filesToUpload + '\n' + fileToUpload;
            }
        } else {
            filesToUpload = filesToUpload + fileToUpload;
        }
    });
    await page.waitForSelector(selector)
    element = await page.$(selector)
    await element.focus()
    await element.uploadFile(filesToUpload)
    // wait both loading bar and spinner gone 
    await wait.elementNotVisible(page, loader.loadingbar)
    await wait.elementNotVisible(page, loader.spinner)
}

module.exports = {
    filesToUpload
}