//apiTest.js
const request = require('supertest');
let app

/**
 * Testing api function 
 */
describe('This is a basic framework for testing API /', function () {
    //Start server 
    before(function () {
        app = require('../index');
    });
    //End server 
    after(function () {
        app.close()
    });


    let key = "123456789"
    /*
      Retrieve data with valid resposne 
    */
    it('Validate 200 response to get all infomration from api', function (done) {
        request(app)
            .get(`/${key}/`)
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, done);
    });

    /*
      Retrieve data with invalid key 
    */
    it('Validate 401 using invalid API key', function (done) {
        request(app)
            .get(`/$key/`)
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(401, done);
    });

    /*
     Search for specific data 
   */
    it('Respond with json containing a state', function (done) {
        request(app)
            .get('/Victoria')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, done)
            .expect('"Victoria found and has a capital Melbourne"')
            ;
    });

    /*
      Search for specific data that is not found
    */
    it('Test 404 error when state not found', function (done) {
        request(app)
            .get('/stateABCD')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(404) //expecting HTTP status code
            .expect('"No valid state/territory found in Australia"') // expecting content value
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });


    let dataTest = {
        "Name": "HappyPlace",
        "AreaCode": "+6613",
        "Address": "ABC HappyPlace"
    }

    /*
      Add new data in validate response  
    */
    it('Check response with 201 new suburb created', function (done) {
        request(app)
            .post('/')
            .send(dataTest)
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(201)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });

    let dataTest2 = {
        "AreaCode": "+6613",
        "Address": "ABC HappyPlace"
    }

    /*
      Add invalid data  
    */
    it('Validate response with 400 invalid data provided', function (done) {
        request(app)
            .post('/')
            .send(dataTest2)
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(400)
            .expect('"Invalid data provided"')
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });


    /*
          Modify existing data 
        */
    let dataTestUpdate = {
        "Name": "HappyPlace",
        "AreaCode": "+UPdated",
        "Address": "A new updated place"
    }

    /*
      Update new data in validate response  
    */
    it('Check response with 200 new suburb updated', function (done) {

        // validate the content is updated
        request(app)
            .put('/')
            .send(dataTestUpdate)
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .expect('"Suburb found and updated created"')
            .end((err) => {
                if (err) return done(err);
                done();
            });

        // get the content and validate its been updated (server side)  
        request(app)
            .get(`/${dataTestUpdate.Name}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .expect(`"${dataTestUpdate.Name} ${dataTestUpdate.AreaCode} ${dataTestUpdate.Address}"`)
            ;

    });


    /*
      Update new data in invalid response  
    */

    let dataTestInvlaid = {
        "Name": "NotFound",
        "AreaCode": "+UPdated",
        "Address": "A new updated place"
    }
    it('Check response with 204 new suburb NOT updated', function (done) {

        // validate the content is NOT updated
        request(app)
            .put('/')
            .send(dataTestInvlaid)
            .set('Accept', 'application/json')
            .expect(204)
            .expect('')
            .end((err) => {
                if (err) return done(err);
                done();
            });

    });

    /*
      Remove data with valid resposne 
    */
    it('Check response with 200 suburb deleted', function (done) {

        // validate the content is updated
        request(app)
            .delete('/')
            .send(dataTestUpdate)
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .expect('"Suburb found and deleted"')
            .end((err) => {
                if (err) return done(err);
                done();
            });

        // get the content and validate its been updated (server side)  
        request(app)
            .get(`/${dataTestUpdate.Name}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .expect(`"No valid state/territory found in Australia"`)
            ;

    });

    /*
        Remove data with invalid resposne 
      */

    let dataTestInvlaidDel = {
        "Name": "NotFound",
        "AreaCode": "+UPdated",
        "Address": "A new updated place"
    }
    it('Check response with 204 new suburb NOT deleted', function (done) {

        // validate the content is NOT updated
        request(app)
            .delete('/')
            .send(dataTestInvlaidDel)
            .set('Accept', 'application/json')
            .expect(204)
            .expect('')
            .end((err) => {
                if (err) return done(err);
                done();
            });

    });


});