const express = require('express');
const router = express.Router();
const vendor = require('./vendor.model');
const user = require('../user/user.model');

/************************* VENDOR Creation *************************/
router.post('/create', (request, response) => {
    let vendorResponse = {};
    let data = new vendor({
        name: request.body.name,
        phoneNumber: request.body.phoneNumber,
        aadhar: request.body.aadhar,
        gst: request.body.gst,
        pan: request.body.pan,
        tan: request.body.tan,
        others:request.body.others,
        picture: request.body.picture,
        userId: request.body.userId,
        organisation: request.body.organisation,
    });
    console.log(data);
    user.findById({ _id: data.userId }, (error, result) => {
        console.log('result error', error);
        console.log('result result', result);
        if (error) {
            console.log(error);
            employeeResponse.error = true;
            employeeResponse.message = `Error :` + " User does not exist";
            response.status(500).json(employeeResponse);
        }
        else{
    data.save((error, result) => {
        console.log('Vendor error', error);
        console.log('Vendor result', result);

        if (error) {
            console.log(error);
            vendorResponse.error = true;
            vendorResponse.message = `Error :` +  " creation failed";
            response.status(500).json(vendorResponse);
        } else {

            vendorResponse.error = false;
            vendorResponse.result = result;
            vendorResponse.message = `Vendor is created  successfull.`;
            response.status(200).json(vendorResponse);
        }
    })

        }
    });

});

/************************** VENDOR DETAIL BY USERID ********************************************** */
router.get('/vendorByUserId', (request, response) => {
    let userId = request.query.userId;
    let sentResponse = {};
    vendor.find({ userId: userId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + "User Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Vendor List";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/******************************* DELETE BY ID *******************************/
router.delete('/delete', (request, response) => {
    let vendorId = request.query.vendorId
    let sentResponse = {}
    vendor.remove({ _id: vendorId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Vendor not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Vendor Deleted";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
module.exports = router;