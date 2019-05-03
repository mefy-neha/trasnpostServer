const express = require('express');
const encryptPassword = require('encrypt-password');
const router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'ploads/' });
var path = require('path');
var fs = require('fs');
var gm = require('gm').subClass({ imageMagick: true });
const user = require('./user.model');



/*************************REGISTRATION *************************/
router.post('/create', (request, response) => {
    let registrationResponse = {};
    let data = new user({
        email: (request.body.email).toLowerCase(),
        name: request.body.name,
        password: encryptPassword(request.body.password),
        role: request.body.role,
        organisation: request.body.organisation

    });
    console.log(data);
    data.save((error, result) => {
        if (error) {
            console.log(error);
            registrationResponse.error = true;
            registrationResponse.message = `Error :` + error.code == 11000 ? error.message : " email already exist";
            response.status(500).json(registrationResponse);
        } else {
            console.log(result);
            registrationResponse.error = false;
            registrationResponse.user = result;
            registrationResponse.message = `registration is  successfull.`;
            response.status(200).json(registrationResponse);

        }

    });
})
/************************************END ******************************************** */


/************************************** LOGIN API ******************************** */

router.post('/login', (request, response) => {
    let password = encryptPassword(request.body.password);
    let email = (request.body.email).toLowerCase();
    let organisation = (request.body.organisation);
    console.log('password', password, email, organisation);
    let userLoginResponse = {};

    user.findOne({ $and: [{ email: email }, { organisation: organisation }] }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error || result === null) {
            userLoginResponse.error = true;
            userLoginResponse.message = "User does not exist";
            response.status(500).json(userLoginResponse);
        } else {
            console.log('result', result)
            if (result.password == password) {
                userLoginResponse.error = false;
                userLoginResponse.user = result;
                userLoginResponse.message = `User login successfully .`;
                response.status(200).json(userLoginResponse);
            } else {
                userLoginResponse.error = true;
                userLoginResponse.message = "Invalid Credentials";
                response.status(500).json(userLoginResponse);
            }
        }
    });
});

/************************************END ******************************************** */
/************************** USER LIST ********************************************** */
router.get('/list', (request, response) => {
    let sentResponse = {};
    user.find({}, (error, result) => {
        console.log('error',error);
        console.log('result',result);
        if (error) {
            sentresponse.error = true;
            sentresponse.message = `Error :` + error.message;
            response.status(500).json(sentresponse);
        }
        else {
            sentresponse.error = true;
            sentresponse.message = "User List";
            sentResponse.result = result
            response.status(500).json(sentresponse);

        }

    })
})
/************************************END ******************************************** */
/************************** USER DETAIL BY ID ********************************************** */
router.get('/userById', (request, response) => {
    let userId = request.query.userId;
    let sentResponse = {};
    user.findOne({ _id: userId }, (error, result) => {
        console.log('error',error);
        console.log('result',result);

        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + "User Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = true;
            sentResponse.message = "User Detail";
            sentResponse.result = result
            response.status(500).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/******************************* DELETE BY ID *******************************/
router.delete('/delete',(request,response)=>{
    let userId=request.query.userId
    let sentResponse={}
    user.remove({_id:userId},(error,result)=>{
        console.log('error',error);
        console.log('result',result);
        if (error) {
            sentresponse.error = true;
            sentresponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentresponse);
        }
        else {
            sentresponse.error = true;
            sentresponse.message = "User Deleted";
            sentResponse.result = result
            response.status(500).json(sentresponse);

        }

    })
})
/************************************END ******************************************** */


module.exports = router;