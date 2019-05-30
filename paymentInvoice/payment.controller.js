const express = require('express');
const router = express.Router();
const payment = require('./payment.model');
const user = require('../user/user.model');

/************************************BANK CREATION ******************************************** */
router.post('/create', (request, response) => {
    let invoiceResponse = {};
    let data = new payment({
        vendorId: request.body.vendorId,
        work_order: request.body.work_order,
        invoice_date: request.body.invoice_date,
        terms: request.body.terms,
        due_date: request.body.due_date,
        sub_total: request.body.sub_total,
        total: request.body.total,
        amount_paid: request.body.amount_paid,
        status: request.body.status,
        adjustment: request.body.adjustment,
        gst: request.body.gst,
        items_details: request.body.items_details,
        terms_condition: request.body.terms_condition ? request.body.terms_condition : null,
        customer_notes: request.body.customer_notes ? request.body.customer_notes : null,
        userId: request.body.userId
    })
    console.log('dataaaa', data)
    user.findById({ _id: data.userId }, (error, result) => {
        console.log('result error', error);
        console.log('result result', result);
        if (error) {
            console.log(error);
            invoiceResponse.error = true;
            invoiceResponse.message = `Error :` + " User does not exist";
            response.status(500).json(invoiceResponse);
        }
        else {
            // data.organisation = result.organisation
            if (result.role == 'superAdmin') {
                console.log('superAdmin')
                data.superAdminId = result._id
                payment.find({ superAdminId: data.superAdminId }, (error, list) => {
                    console.log('list error', error);
                    console.log('list result', list);
                    if (error) {
                        console.log(error);
                        invoiceResponse.error = true;
                        invoiceResponse.message = `Error :` + " creation failed";
                        response.status(500).json(invoiceResponse);
                    } else {
                        console.log('listttt of Payment  invoice', list.length)
                        let y = {}
                        y = list.length + 1
                        data.invoice_number = 'INV-00' + y
                        data.save((error, result) => {
                            console.log('Payment Invoice error', error);
                            console.log('Payment Invoice result', result);
                            if (error) {
                                console.log(error);
                                invoiceResponse.error = true;
                                invoiceResponse.message = `Error :` + " creation failed";
                                response.status(500).json(invoiceResponse);
                            } else {

                                invoiceResponse.error = false;
                                invoiceResponse.result = result;
                                invoiceResponse.message = `Payment Invoice is created  successfull.`;
                                response.status(200).json(invoiceResponse);
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
                        invoiceResponse.error = true;
                        invoiceResponse.message = `Error :` + " creation failed";
                        response.status(500).json(invoiceResponse);
                    } else {
                        console.log('listttt of Payment invoice', list.length)
                        let x = {}
                        x = list.length + 1
                        data.invoice_number = 'INV-00' + x
                        data.save((error, result) => {
                            console.log(' Payment Invoice error', error);
                            console.log('Payment Invoice result', result);
                            if (error) {
                                console.log(error);
                                invoiceResponse.error = true;
                                invoiceResponse.message = `Error :` + " creation failed";
                                response.status(500).json(invoiceResponse);
                            } else {

                                invoiceResponse.error = false;
                                invoiceResponse.result = result;
                                invoiceResponse.message = ` Payment Invoice is created  successfull.`;
                                response.status(200).json(invoiceResponse);
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
    payment.find({}, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message;
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "ALL Payment Invoice List";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/************************** BANK DETAIL BY SUPERADMINID ********************************************** */
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
                    sentResponse.message = " Payment Invoice List";
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
    let paymentId = request.query.paymentId
    let sentResponse = {}
    payment.remove({ _id: paymentId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Invoice Deleted";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/************************************UPDATION OF INVOICE ******************************************** */
// router.put('/paid', (request, response) => {
//     let sentResponse = {};
//     let invoiceId = request.body.invoiceId;
//     let amount_paid = request.body.amount_paid;
//     invoice.findById({ _id: invoiceId }, (error, result) => {
//         console.log('error', error)
//         console.log('result', result)
//         if (error || result == null) {
//             sentResponse.error = true;
//             sentResponse.message = `Error :` + error.message + " Does not exist";
//             response.status(500).json(sentResponse);
//         }
//         else if (result) {
//             if (result.total == amount_paid) {
//                 console.log('paid')
//                 result.status = (request.body.status ? (request.body.status) : 'paid');
//                 result.amount_paid = (request.body.amount_paid ? (request.body.amount_paid) : result.amount_paid);
//                 result.save((error, result) => {
//                     if (error) {
//                         sentResponse.error = true;
//                         sentResponse.message = `Error :` + error.message + " Not update";
//                         response.status(500).json(sentResponse);
//                     }
//                     else {
//                         sentResponse.error = false;
//                         sentResponse.message = "Invoice Updated";
//                         sentResponse.result = result
//                         response.status(200).json(sentResponse);

//                     }
//                 })
//             }
//             else {
//                 console.log('unpaid')
//                 sentResponse.error = false;
//                 sentResponse.message = "total amount is not equal to amount paid,invoice not updated";
//                 sentResponse.result = result
//                 response.status(200).json(sentResponse);

//             }

//         }
//     })
// })
/************************************END ******************************************** */

module.exports = router;