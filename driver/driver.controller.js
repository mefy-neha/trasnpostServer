const express = require('express');
const router = express.Router();
const driver = require('./driver.model');
const user = require('../user/user.model');




/************************* Driver Creation *************************/
router.post('/create', (request, response) => {
    let driverResponse = {};
    let data = new driver({
        name: request.body.name,
        phoneNumber: request.body.phoneNumber,
        email:request.body.email?request.body.email:null,
        company_name:request.body.company_name?request.body.company_name:null,
        website:request.body.website?request.body.website:null,
        contact_type:request.body.contact_type,
        gst:request.body.gst?request.body.gst:null,
        pan:request.body.pan?request.body.pan:null,
        tan:request.body.tan?request.body.tan:null,
        voterId:request.body.voterId?request.body.voterId:null,
        aadhar: request.body.aadhar?request.body.aadhar:null,
        licence: request.body.licence?request.body.licence:null,
        training_certificate: request.body.training_certificate?request.body.training_certificate:null,
        police_verification: request.body.police_verification?request.body.police_verification:null,
        others: request.body.others,
        picture: request.body.picture?request.body.picture:null,
        userId: request.body.userId
    });
    console.log(data);
    user.findById({ _id: data.userId }, (error, result) => {
        console.log('user error', error);
        console.log('user result', result);
        if (error || result == null) {
            console.log(error);
            driverResponse.error = true;
            driverResponse.message = `Error :` + " User does not exist";
            response.status(500).json(driverResponse);
        } else {
            data.role = result.role,
                data.organisation = result.organisation
            if (result.role == 'superAdmin') {
                console.log('superAdmin')
                data.superAdminId = result._id
                data.save((error, result) => {
                    console.log('Driver error', error);
                    console.log('Driver result', result);
                    if (error) {
                        console.log(error);
                        driverResponse.error = true;
                        driverResponse.message = `Error :` + " creation failed";
                        response.status(500).json(driverResponse);
                    } else {

                        driverResponse.error = false;
                        driverResponse.result = result;
                        driverResponse.message = `Driver is created  successfull.`;
                        response.status(200).json(driverResponse);
                    }
                })
            }
            else {
                console.log('admin,other')
                data.superAdminId = result.superAdminId._id
                data.save((error, result) => {
                    console.log('Driver error', error);
                    console.log('Driver result', result);
                    if (error) {
                        console.log(error);
                        driverResponse.error = true;
                        driverResponse.message = `Error :` + " creation failed";
                        response.status(500).json(driverResponse);
                    } else {

                        driverResponse.error = false;
                        driverResponse.result = result;
                        driverResponse.message = `Driver is created  successfull.`;
                        response.status(200).json(driverResponse);
                    }
                })
            }
        }
    })
});

/************************************END ******************************************** */
/************************************* LIST OF DRIVER ***************************/
router.get('/list', (request, response) => {
    let sentResponse = {};
    driver.find({}, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message;
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Driver List";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/************************** DRIVER DETAIL BY USERID ********************************************** */
router.get('/driverlist', (request, response) => {
    let superAdminId = request.query.superAdminId;
    let sentResponse = {};
    user.findById({ _id: superAdminId }, (error, result) => {
        console.log('error...........', error);
        console.log('result', result);
        if (error || result==null) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error+ '  ' + "User Does not exist";
            response.status(500).json(sentResponse);
        }
else{
        console.log('role superadmin')
        driver.find({ superAdminId: superAdminId }, (error, result) => {
            console.log('error', error);
            console.log('result', result);
            if (error) {
                sentResponse.error = true;
                sentResponse.message = `Error :` + error.message + "Something went wrong";
                response.status(500).json(sentResponse);
            }
            else {
                sentResponse.error = false;
                sentResponse.message = "Driver List";
                sentResponse.result = result
                response.status(200).json(sentResponse);

            }

        })
    }
    })
})
/************************************END ******************************************** */
/******************************* DELETE BY ID *******************************/
router.delete('/delete', (request, response) => {
    let driverId = request.query.driverId
    let sentResponse = {}
    user.remove({ _id: driverId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Driver Deleted";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */

module.exports = router;
