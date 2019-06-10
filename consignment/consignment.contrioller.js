const express = require('express');
const router = express.Router();
const consignment = require('./consignment.model');
const user = require('../user/user.model');
const moment = require('moment');

/************************************BANK CREATION ******************************************** */
router.post('/create', (request, response) => {
    let consignmentResponse = {};
    let data = new consignment({
        tl_number: request.body.tl_number,
        product: request.body.product,
        location_number: request.body.location_number,
        challan_number: request.body.challan_number,
        challan_doc: request.body.challan_doc ? request.body.challan_doc : null,
        challan_date: request.body.challan_date ? moment(request.body.challan_date).format('YYYY-MM-DD') : null,
        consignor: request.body.consignor,
        consignee: request.body.consignee,
        consignment_date: request.body.consignment_date ? moment(request.body.consignment_date).format('YYYY-MM-DD') : null,
        reference_number: request.body.reference_number,
        truck_number: request.body.truck_number,
        origin_place: request.body.origin_place,
        destination: request.body.destination,
        authorize_person: request.body.authorize_person,
        driver_license_number: request.body.driver_license_number,
        driver_name: request.body.driver_name,
        quantity: request.body.quantity,
        advance_payment: request.body.advance_payment,
        userId: request.body.userId
    })
    console.log('dataaaa', data)
    user.findById({ _id: data.userId }, (error, result) => {
        console.log('result error', error);
        console.log('result result', result);
        if (error) {
            console.log(error);
            consignmentResponse.error = true;
            consignmentResponse.message = `Error :` + " User does not exist";
            response.status(500).json(consignmentResponse);
        }
        else {
            // data.organisation = result.organisation
            if (result.role == 'superAdmin') {
                console.log('superAdmin')
                data.superAdminId = result._id
                consignment.find({ superAdminId: data.superAdmin }, (error, list) => {
                    console.log('error', error);
                    console.log(' consignment length', list.length)
                    if (error) {
                        journalResponse.error = true;
                        journalResponse.message = `Error :` + error.message + 'Organisation does not exist';
                        response.status(500).json(journalResponse);
                    }
                    else {
                        let y = {}
                        y = list.length + 1
                        data.consignmentNumber = 'CON-00' + y
                        data.save((error, result) => {
                            console.log('Consignment error', error);
                            console.log('Consignment result', result);
                            if (error) {
                                console.log(error);
                                consignmentResponse.error = true;
                                consignmentResponse.message = `Error :` + " creation failed";
                                response.status(500).json(consignmentResponse);
                            } else {

                                consignmentResponse.error = false;
                                consignmentResponse.result = result;
                                consignmentResponse.message = `Consignment is created  successfull.`;
                                response.status(200).json(consignmentResponse);
                            }
                        })
                    }
                })
            }
            else {
                console.log('admin,other')
                data.superAdminId = result.superAdminId._id
                consignment.find({ superAdminId:data. superAdminId }, (error, list) => {
                    console.log('error', error);
                    console.log(' consignment length', list.length)
                    if (error) {
                        journalResponse.error = true;
                        journalResponse.message = `Error :` + error.message + 'Organisation does not exist';
                        response.status(500).json(journalResponse);
                    }
                    else {
                        let y = {}
                        y = list.length + 1
                        data.consignmentNumber = 'CON-00' + y
                        data.save((error, result) => {
                            console.log('Consignment error', error);
                            console.log('Consignment result', result);
                            if (error) {
                                console.log(error);
                                consignmentResponse.error = true;
                                consignmentResponse.message = `Error :` + " creation failed";
                                response.status(500).json(consignmentResponse);
                            } else {
                                consignmentResponse.error = false;
                                consignmentResponse.result = result;
                                consignmentResponse.message = `Consignment is created  successfull.`;
                                response.status(200).json(consignmentResponse);
                            }
                        })
                    }
                })
            }
        }

    })

})

/************************************END ******************************************** */
/************************** BANK LIST ********************************************** */
router.get('/list', (request, response) => {
    let sentResponse = {};
    consignment.find({}, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message;
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "ALL Consignment List";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/************************** BANK DETAIL BY SUPERADMINID ********************************************** */
router.get('/consignmentList', (request, response) => {
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
            consignment.find({ superAdminId: superAdminId }, (error, result) => {
                console.log('error', error);
                console.log('result', result);
                if (error) {
                    sentResponse.error = true;
                    sentResponse.message = `Error :` + error.message + "Something went wrong";
                    response.status(500).json(sentResponse);
                }
                else {
                    sentResponse.error = false;
                    sentResponse.message = "Consignment List";
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
    let consignmentId = request.query.consignmentId
    let sentResponse = {}
    consignment.remove({ _id: consignmentId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Consignment Deleted";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
module.exports = router;