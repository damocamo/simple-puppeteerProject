const scope = require('./scope')
const constants = require('./constants')
const fs = require('fs')
const fse = require('fs-extra')
const exec = require('child-process-promise').exec
const moment = require('moment')
const orderNumberStore = require('./orderNumberStore.js');

/* 
    Obvious function that takes a Screenshot with the name of pass or fail
*/
async function takeScreenshot(result) {

    //create the folder for current run. 
    return await scope.page.screenshot({
        path: `./output/${scope.folder}/screenshots/${getTime('HH:mm:ss')}-${result}.png`,
        fullPage: true
    });
}

/* 
    Takes a Screenshot of a selected section is required and saves path
*/
const selectorShot = async (page, s, path) => {
    const frame = await page.mainFrame();
    const el = await frame.$(s);
    if (el) {
        const box = await el.boundingBox();
        console.log(JSON.stringify(box));
        if (box) {
            try {
                await el.screenshot({
                    path: path,
                });
            } catch (error) {
                console.log(error)
            }
        } else {
            console.log(`Element not visible for capturing: ${s}`);
        }
    } else {
        console.log(`Element not found for capturing: ${s}`);
    }
};

/*
    Takes a screenshot of the step if config is set to true (this on a passed step) failed steps always takes screenshots 
*/
const screenshotStep = async (status) => {
    let stream = ''
    if (constants.stepScreenshot && status) {
        console.log('taking step screenshot...')
        stream = await takeScreenshot(status)
    }
    return stream
}


/*
    Creates a dir in the base of the folder structure 
*/
const mkdirSync = async function (dirPath) {
    try {
        await fs.mkdirSync(dirPath)
    } catch (err) {
        if (err.code !== 'EXIST') throw err
    }
    await fs.mkdirSync(`./${dirPath}/screenshots`)
}

/*
    Hepler to check the dir if empty or not and removes files, depending on config file setting 
*/
const checkDir = async function (bool) {
    if (fse.pathExistsSync('output/') && bool) {
        console.log('Clear report directory ...')
        const files = await fs.readdirSync('output/');
        // goes through the map and removes all but the .json cause it creates at the start 
        files.map(val => {
            if (val === 'results.json' || val === '@rerun.txt') {} else
                fse.removeSync('output/' + val)
        })
        // recreate directories
        await fse.ensureDirSync('output/screenshots')
    } else if (fse.pathExistsSync('output/') && !bool) {
        return
    } else {
        await fse.ensureDirSync('output/screenshots')
    }
}


/*
    Helper to executre command to create use on a MAC system that able to loginto SIT
*/
const execCommand = async function (args) {
    let result
    try {
        result = await exec(args)
    } catch (error) {
        console.error('ERROR: ', error.stderr);
    }
    return result
}

/*
    Gets the timeFormat however you like eg(DD-MM-YYYY HH:mm:ss)
*/
const getTime = (format) => {
    return moment().format(format)
}

/*
    Function that checks cofig if logger and then prints message to console 
*/
const logger = (isLogger, message) => {
    if (isLogger) {
        console.log(message)
    }
}

//Removes spaces   
const removeCars = str => {
    return splitedQuotes = str.replace(/(\s|\/)/g, "");
};


module.exports = {
    takeScreenshot,
    mkdirSync,
    execCommand,
    selectorShot,
    getTime,
    screenshotStep,
    checkDir,
    logger,
    removeCars,
}