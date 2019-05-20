const express = require('express');
const router = express.Router();
const customer = require('./customer.model');
const user = require('../user/user.model');

/************************* CUSTOMER Creation *************************/
router.post('/create', (request, response) => {
    let customerResponse = {};
    let data = new customer({
        name: request.body.name,
        email: (request.body.email).toLowerCase(),
        phoneNumber: request.body.phoneNumber,
        aadhar: request.body.aadhar,
        gst: request.body.gst,
        pan: request.body.pan,
        tan: request.body.tan,
        picture: request.body.picture,
        userId: request.body.userId,
        company_name: request.body.company_name,
        others:request.body.others,
        website: request.body.website,
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
        console.log('Customer error', error);
        console.log('Customer result', result);
        if (error) {
            console.log(error);
            customerResponse.error = true;
            customerResponse.message = `Error :` + error.code == 11000 ? error.message : " creation failed";
            response.status(500).json(customerResponse);
        } else {

            customerResponse.err = false;
            customerResponse.user = res;
            customerResponse.message = `Customer is created  successfull.`;
            response.status(200).json(customerResponse);
        }
    })
}
    })
});

/************************************END ******************************************** */
/************************** CUSTOMER DETAIL BY USERID ********************************************** */
router.get('/customerByUserId', (request, response) => {
    let userId = request.query.userId;
    let sentResponse = {};
    customer.find({ userId: userId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + "User Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Customer List";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/******************************* DELETE BY ID *******************************/
router.delete('/delete', (request, response) => {
    let customerId = request.query.customerId
    let sentResponse = {}
    customer.remove({ _id: customerId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Customer exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Customer Deleted";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
module.exports = router;