const express = require('express');
const router = express.Router();
const payment = require('./payment.model');
const user = require('../user/user.model');

/************************************ PAYMENT CREATION ******************************************** */
router.post('/create', (request, response) => {
    let paymentResponse = {};
    let data = new payment({
        contactId: request.body.contactId?request.body.contactId:null,
        contractId: request.body.contractId?request.body.contractId:null,
        ownerId:request.body.ownerId?request.body.ownerId:null,
        fleetId: request.body.fleetId?request.body.fleetId:null,
        payment_date: request.body.payment_date,
        payment_mode: request.body.payment_mode,
        payment: request.body.payment,
        amount_paid: request.body.amount_paid,
        cheque_number: request.body.cheque_number ? request.body.cheque_number : null,
        bankId: request.body.bankId ? request.body.bankId : null,
        denomination: request.body.denomination ? request.body.denomination : null,
        userId: request.body.userId
    })
    console.log('dataaaa', data)
    user.findById({ _id: data.userId }, (error, result) => {
        console.log('result error', error);
        console.log('result result', result);
        if (error) {
            console.log(error);
            paymentResponse.error = true;
            paymentResponse.message = `Error :` + " User does not exist";
            response.status(500).json(paymentResponse);
        }
        else {
            if (result.role == 'superAdmin') {
                console.log('superAdmin')
                data.superAdminId = result._id
                payment.find({ superAdminId: data.superAdminId }, (error, list) => {
                    console.log('list error', error);
                    console.log('list result', list);
                    if (error) {
                        console.log(error);
                        paymentResponse.error = true;
                        paymentResponse.message = `Error :` + " creation failed";
                        response.status(500).json(paymentResponse);
                    } else {
                        console.log('listttt of payment', list.length)
                        let y = {}
                        y = list.length + 1
                        data.payment_number = 'PAY-00' + y
                        data.save((error, result) => {
                            console.log('Invoice error', error);
                            console.log('Invoice result', result);
                            if (error) {
                                console.log(error);
                                paymentResponse.error = true;
                                paymentResponse.message = `Error :` + " creation failed";
                                response.status(500).json(paymentResponse);
                            } else {

                                paymentResponse.error = false;
                                paymentResponse.result = result;
                                paymentResponse.message = `Invoice is created  successfull.`;
                                response.status(200).json(paymentResponse);
                            }
                        })
                    }
                })
            }
            else {
                console.log('admin,other')
                data.superAdminId = result.superAdminId._id
                payment.find({ superAdminId: data.superAdminId }, (error, list) => {
                    console.log('list error', error);
                    console.log('list result', list);
                    if (error) {
                        console.log(error);
                        paymentResponse.error = true;
                        paymentResponse.message = `Error :` + " creation failed";
                        response.status(500).json(paymentResponse);
                    } else {
                        console.log('listttt of Payment', list.length)
                        let x = {}
                        x = list.length + 1
                        data.payment_number = 'PAY-00' + x
                        data.save((error, result) => {
                            console.log('Invoice error', error);
                            console.log('Invoice result', result);
                            if (error) {
                                console.log(error);
                                paymentResponse.error = true;
                                paymentResponse.message = `Error :` + " creation failed";
                                response.status(500).json(paymentResponse);
                            } else {

                                paymentResponse.error = false;
                                paymentResponse.result = result;
                                paymentResponse.message = `Invoice is created  successfull.`;
                                response.status(200).json(paymentResponse);
                            }
                        })
                    }
                })
            }
        }

    })

})

/************************************END ******************************************** */


/************************** PAYMENT DETAIL BY SUPERADMINID ********************************************** */
router.get('/paymentList', (request, response) => {
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
            payment.find({ superAdminId: superAdminId }, (error, result) => {
                console.log('error', error);
                console.log('result', result);
                if (error) {
                    sentResponse.error = true;
                    sentResponse.message = `Error :` + error.message + "Something went wrong";
                    response.status(500).json(sentResponse);
                }
                else {
                    sentResponse.error = false;
                    sentResponse.message = "Payment List";
                    sentResponse.result = result
                    response.status(200).json(sentResponse);

                }

            })
        }
    })
})
/************************************END ******************************************** */
/******************************* PAYMENT BY ID *******************************/
router.get('/peymentById', (request, response) => {
    let peymentId = request.query.peymentId
    let sentResponse = {}
    payment.findById({ _id: peymentId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Payment Detail";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */















module.exports = router;