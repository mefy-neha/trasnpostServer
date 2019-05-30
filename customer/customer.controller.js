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
        picture: request.body.picture?request.body.picture:null,
        userId: request.body.userId,
        company_name: request.body.company_name,
        others:request.body.others,
        website: request.body.website,
        userId: request.body.userId,
    });
    console.log(data);
    user.findById({ _id: data.userId }, (error, result) => {
        console.log('result error', error);
        console.log('result result', result);
        if (error) {
            console.log(error);
            customerResponse.error = true;
            customerResponse.message = `Error :` + " User does not exist";
            response.status(500).json(customerResponse);
        }
        else{
            data.role = result.role,
            data.organisation = result.organisation
        if (result.role == 'superAdmin') {
            console.log('superAdmin')
            data.superAdminId = result._id
            data.save((error, result) => {
                console.log('Customer error', error);
                console.log('Customer result', result);
                if (error) {
                    console.log(error);
                    customerResponse.error = true;
                    customerResponse.message = `Error :` + " creation failed";
                    response.status(500).json(customerResponse);
                } else {

                    customerResponse.error = false;
                    customerResponse.result = result;
                    customerResponse.message = `Customer is created  successfull.`;
                    response.status(200).json(customerResponse);
                }
            })
        }
        else {
            console.log('admin,other')
            data.superAdminId = result.superAdminId._id
            data.save((error, result) => {
                console.log('Customer error', error);
                console.log('Customer result', result);
                if (error) {
                    console.log(error);
                    customerResponse.error = true;
                    customerResponse.message = `Error :` + " creation failed";
                    response.status(500).json(customerResponse);
                } else {

                    customerResponse.error = false;
                    customerResponse.result = result;
                    customerResponse.message = `Customer is created  successfull.`;
                    response.status(200).json(customerResponse);
                }
            })
        }
        }

    })
});

/************************************END ******************************************** */
/************************** CUSTOMER DETAIL  ********************************************** */
router.get('/list', (request, response) => {
    let sentResponse = {};
    customer.find({}, (error, result) => {
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
/************************** CUSTOMER DETAIL BY SUPERADMINID ********************************************** */
router.get('/customerlist', (request, response) => {
    let superAdminId = request.query.superAdminId;
    let sentResponse = {};
    user.findById({ _id: superAdminId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error || result==null) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error +'  '+ "User Does not exist";
            response.status(500).json(sentResponse);
        }
        else{
        console.log('role superadmin')
        customer.find({ superAdminId: superAdminId }, (error, result) => {
            console.log('error', error);
            console.log('result', result);
            if (error) {
                sentResponse.error = true;
                sentResponse.message = `Error :` + error.message + "Something went wrong";
                response.status(500).json(sentResponse);
            }
            else {
                sentResponse.error = false;
                sentResponse.message = "Custometr List";
                sentResponse.result = result
                response.status(200).json(sentResponse);

            }

        })
    }
    })
})
/************************************END ******************************************** */
module.exports = router;