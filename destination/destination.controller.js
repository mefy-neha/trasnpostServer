
const express = require('express');
const router = express.Router();
const destination = require('./destination.model');
const user = require('../user/user.model');

/************************************DESTINATION CREATION ******************************************** */

router.post('/create', (request, response) => {
    let destinationResponse = {};
    let data = new destination({
        customerId: request.body.customerId,
        details: request.body.details,
        userId: request.body.userId
    })
    console.log('dataaaa', data)
    user.findById({ _id: data.userId }, (error, result) => {
        console.log('result error', error);
        console.log('result result', result);
        if (error) {
            console.log(error);
            destinationResponse.error = true;
            destinationResponse.message = `Error :` + " User does not exist";
            response.status(500).json(destinationResponse);
        }
        else {
            if (result.role == 'superAdmin') {
                console.log('superAdmin')
                data.superAdminId = result._id
                data.save((error, result) => {
                    console.log('Destination error', error);
                    console.log('Destination result', result);
                    if (error || result == null) {
                        destinationResponse.error = true;
                        destinationResponse.message = `Error :` + "Creation failed";
                        response.status(500).json(destinationResponse);
                    } else {

                        destinationResponse.error = false;
                        destinationResponse.result = result;
                        destinationResponse.message = `Destination is created  successfull.`;
                        response.status(200).json(destinationResponse);
                    }
                })
            }
            else {
                console.log('admin,other')
                data.superAdminId = result.superAdminId._id
                data.save((error, result) => {
                    console.log('Destination error', error);
                    console.log('Destination result', result);
                    if (error || result == null) {
                        destinationResponse.error = true;
                        destinationResponse.message = `Error :` + "Creation failed";
                        response.status(500).json(destinationResponse);
                    } else {

                        destinationResponse.error = false;
                        destinationResponse.result = result;
                        destinationResponse.message = `Destination is created  successfull.`;
                        response.status(200).json(destinationResponse);
                    }
                })
            }
        }

    })

})
/************************************END ******************************************** */
/************************** DESTINATION LIST ********************************************** */
router.get('/list', (request, response) => {
    let sentResponse = {};
    destination.find({}, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message;
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "ALL Destination List";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/************************** DESTINATION DETAIL BY SUPERADMINID ********************************************** */
router.get('/destinationList', (request, response) => {
    let superAdminId = request.query.superAdminId;
    let sentResponse = {};
    user.findById({ _id: superAdminId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error || result == null) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error + '  ' + "User Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            console.log('role superadmin')
            destination.find({ superAdminId: superAdminId }, (error, result) => {
                console.log('error', error);
                console.log('result', result);
                if (error) {
                    sentResponse.error = true;
                    sentResponse.message = `Error :` + error.message + "Something went wrong";
                    response.status(500).json(sentResponse);
                }
                else {
                    sentResponse.error = false;
                    sentResponse.message = "Destination List";
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
    let invoiceId = request.query.invoiceId
    let sentResponse = {}
    destination.remove({ _id: invoiceId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Destination Deleted";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */

module.exports = router;