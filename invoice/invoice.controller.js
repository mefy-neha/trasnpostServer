const express = require('express');
const router = express.Router();
const invoice = require('./invoice.model');
const user = require('../user/user.model');
const moment = require('moment');
/************************************BANK CREATION ******************************************** */
router.post('/create', (request, response) => {
    let invoiceResponse = {};
    let data = new invoice({
        customerId: request.body.customerId,
        work_order: request.body.work_order,
        invoice_date: request.body.invoice_date? moment(request.body.invoice_date).format('YYYY-MM-DD'):null,
        terms: request.body.terms,
        due_date: request.body.due_date? moment(request.body.due_date).format('YYYY-MM-DD'):null,
        sub_total: request.body.sub_total,
        total: request.body.total,
        amount_due: request.body.total,
        amount_paid: '0',
        status: 'unpaid',
        adjustment: request.body.adjustment,
        gst: request.body.gst,
        reverse_change:request.body.reverse_change,
        items_details: request.body.items_details,
        terms_condition: request.body.terms_condition ? request.body.terms_condition : null,
        customer_notes: request.body.customer_notes ? request.body.customer_notes : null,
        userId: request.body.userId
    })
    console.log('dataaaa', data)
    if(request.body.period!=null){
        data.period={
            start_date:request.body.period.start_date? moment(request.body.period.start_date).format('YYYY-MM-DD'):null,
            end_date:request.body.period.end_date?moment(request.body.period.end_date).format('YYYY-MM-DD'):null
        }
        console.log('gst',data.period)
     } 
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
                invoice.find({ superAdminId: data.superAdminId }, (error, list) => {
                    console.log('list error', error);
                    console.log('list result', list);
                    if (error) {
                        console.log(error);
                        invoiceResponse.error = true;
                        invoiceResponse.message = `Error :` + " creation failed";
                        response.status(500).json(invoiceResponse);
                    } else {
                        console.log('listttt of invoice', list.length)
                        let y = {}
                        y = list.length + 1
                        data.invoice_number = 'INV-00' + y
                        data.save((error, result) => {
                            console.log('Invoice error', error);
                            console.log('Invoice result', result);
                            if (error) {
                                console.log(error);
                                invoiceResponse.error = true;
                                invoiceResponse.message = `Error :` + " creation failed";
                                response.status(500).json(invoiceResponse);
                            } else {

                                invoiceResponse.error = false;
                                invoiceResponse.result = result;
                                invoiceResponse.message = `Invoice is created  successfull.`;
                                response.status(200).json(invoiceResponse);
                            }
                        })
                    }
                })
            }
            else {
                console.log('admin,other')
                data.superAdminId = result.superAdminId._id
                invoice.find({ superAdminId: data.superAdminId }, (error, list) => {
                    console.log('list error', error);
                    console.log('list result', list);
                    if (error) {
                        console.log(error);
                        invoiceResponse.error = true;
                        invoiceResponse.message = `Error :` + " creation failed";
                        response.status(500).json(invoiceResponse);
                    } else {
                        console.log('listttt of invoice', list.length)
                        let x = {}
                        x = list.length + 1
                        data.invoice_number = 'INV-00' + x
                        data.save((error, result) => {
                            console.log('Invoice error', error);
                            console.log('Invoice result', result);
                            if (error) {
                                console.log(error);
                                invoiceResponse.error = true;
                                invoiceResponse.message = `Error :` + " creation failed";
                                response.status(500).json(invoiceResponse);
                            } else {

                                invoiceResponse.error = false;
                                invoiceResponse.result = result;
                                invoiceResponse.message = `Invoice is created  successfull.`;
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
/************************** INVOICE LIST ********************************************** */
router.get('/list', (request, response) => {
    let sentResponse = {};
    invoice.find({}, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message;
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "ALL Invoice List";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/************************** BANK DETAIL BY SUPERADMINID ********************************************** */
router.get('/invoiceList', (request, response) => {
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
            invoice.find({ superAdminId: superAdminId }, (error, result) => {
                console.log('error', error);
                console.log('result', result);
                if (error) {
                    sentResponse.error = true;
                    sentResponse.message = `Error :` + error.message + "Something went wrong";
                    response.status(500).json(sentResponse);
                }
                else {
                    sentResponse.error = false;
                    sentResponse.message = "Invoice List";
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
    invoice.remove({ _id: invoiceId }, (error, result) => {
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
router.put('/paid', (request, response) => {
    let sentResponse = {};
    let invoiceId = request.body.invoiceId;
    let amount_paid = request.body.amount_paid;
    console.log('result.amount_paid',amount_paid)
    invoice.findById({ _id: invoiceId }, (error, result) => {
        console.log('error', error)
        // console.log('result', result)
        if (error || result == null) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentResponse);
        }
        else if (result.total == amount_paid) {
                console.log('result.total',result.total)
                console.log('paid')
                result.status = (request.body.status ? (request.body.status) : 'paid');
                result.amount_paid = (request.body.amount_paid ? (request.body.amount_paid) : result.amount_paid);
                result.amount_due=result.amount_due- result.amount_paid
                result.save((error, result) => {    
                    console.log('error', error)    
                     // console.log('result', result)
                        sentResponse.error = false;
                        sentResponse.message = "Invoice Updated";
                        sentResponse.result = result
                        response.status(200).json(sentResponse);

                    
                })
            }
            else if(result){
                console.log('result',result.total,result.amount_paid)
                result.amount_paid = (request.body.amount_paid ? (request.body.amount_paid) : result.amount_paid);
                result.amount_due=result.amount_due- result.amount_paid 
                console.log('total',result.total)
                result.save((error, result) => {
                    console.log(' save error',error)
                    if (error) {
                        sentResponse.error = true;
                        sentResponse.message = `Error :` + error.message + " Not update";
                        response.status(500).json(sentResponse);
                    }
                    else {
                        sentResponse.error = false;
                        sentResponse.message = "Invoice Updated";
                        sentResponse.result = result
                        response.status(200).json(sentResponse);

                    }
                })
            }
    })
})
/************************************END ******************************************** */

module.exports = router;