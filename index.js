// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// defining the Express app
const app = express();

var arr = Array(2).fill(null).map(() => Array(4));
//console.info(arr);

// defining an array to work as the database (temporary solution)
const ads = [
    { title: 'BASIC API' }
];

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));
// Yes bad security but im not an API dev....
let key = "123456789"


/**
 * get all map location
 */
app.get('/:key/*', function (req, res, next) {
    if (req.params.key === key) {
        return res.json('Welcome to Australia that has 6 states and 2 territories');
    }
    return res.status(401).json('Unauthorized');

});

/**
 * Get a map location 
 */
app.get('/:Name', function (req, res, next) {
    if (req.params.Name === 'Victoria') { // just to demo
        return res.json('Victoria found and has a capital Melbourne');
    }
    for(let i = 0 ; i < arr.length; i++){
        if(arr[i][0] === req.params.Name)
        {
            return res.status(200).json(arr[i][0] + " " + arr[i][1] + " " + arr[i][2]);
        }
    }
    
    return res.status(404).json('No valid state/territory found in Australia');
});

/**
 * Add a new suburbs
 */
app.post('/', function (req, res, next) {
    let content = req.body;
    if (content.Name && content.AreaCode && content.Address) {
        arr[0][0] = content.Name;
        arr[0][1] = content.AreaCode;
        arr[0][2] = content.Address;
        return res.status(201).json("New suburb created");
    }
    return res.status(400).json('Invalid data provided');
});

/**
 * Modify suburbs
 */
app.put('/', function (req, res, next) {
    let content = req.body;

    for(let i = 0 ; i < arr.length; i++){
        if(arr[i][0] === content.Name)
        {
            arr[i][1] = content.AreaCode;
            arr[i][2] = content.Address;
            return res.status(200).json("Suburb found and updated created");
        }
    }
    return res.status(204).json();

});


/**
 * Delete suburbs
 */
app.delete('/', function (req, res, next) {
    let content = req.body;

    for(let i = 0 ; i < arr.length; i++){
        if(arr[i][0] === content.Name)
        {
            arr[i][0] = null;
            arr[i][1] = null;
            arr[i][2] = null;
            return res.status(200).json("Suburb found and deleted");
        }
    }
    return res.status(204).json();

});



// starting the server
module.exports = app.listen(3001, () => {
    console.log('listening on port 3001');
});

