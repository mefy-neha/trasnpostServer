const express = require('express');
const router = express.Router();
const bill = require('./bill.model');
const user = require('../user/user.model');
const moment = require('moment');
/************************************BANK CREATION ******************************************** */
router.post('/create', (request, response) => {
    let invoiceResponse = {};
    let data = new bill({
        vendorId: request.body.vendorId,
        work_order: request.body.work_order,
        bill_date: request.body.bill_date? moment(request.body.bill_date).format('YYYY-MM-DD'):null,
        terms: request.body.terms,
        due_date: request.body.due_date? moment(request.body.due_date).format('YYYY-MM-DD'):null,
        sub_total: request.body.sub_total,
        total: request.body.total,
        amount_paid: request.body.amount_paid?request.body.amount_paid:null,
        status: request.body.status,
        adjustment: request.body.adjustment,
        tds: request.body.tds,
        items_details: request.body.items_details,
        reverse_change:request.body.reverse_change,
        notes: request.body.notes ? request.body.notes : null,
        discount: request.body.discount ? request.body.discount : null,
        customer_notes: request.body.customer_notes ? request.body.customer_notes : null,
        userId: request.body.userId
    })
    if(request.body.period!=null){
        data.period={
            start_date:request.body.period.start_date? moment(request.body.period.start_date).format('YYYY-MM-DD'):null,
            end_date:request.body.period.end_date?moment(request.body.period.end_date).format('YYYY-MM-DD'):null
        }
        console.log('gst',data.period)
     } 
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
                bill.find({ superAdminId: data.superAdminId }, (error, list) => {
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
                                invoiceResponse.message = `Bill is created  successfull.`;
                                response.status(200).json(invoiceResponse);
                            }
                        })
                    }
                })
            }
            else {
                console.log('admin,other')
                data.superAdminId = result.superAdminId._id
                bill.find({ superAdminId: data.superAdminId }, (error, list) => {
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
                                invoiceResponse.message = ` Bill is created  successfull.`;
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
    bill.find({}, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message;
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "ALL Bill Invoice List";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/************************** BANK DETAIL BY SUPERADMINID ********************************************** */
router.get('/billList', (request, response) => {
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
            bill.find({ superAdminId: superAdminId }, (error, result) => {
                console.log('error', error);
                console.log('result', result);
                if (error) {
                    sentResponse.error = true;
                    sentResponse.message = `Error :` + error.message + "Something went wrong";
                    response.status(500).json(sentResponse);
                }
                else {
                    sentResponse.error = false;
                    sentResponse.message = " Bill List";
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
    let billId = request.query.billId
    let sentResponse = {}
    bill.remove({ _id: billId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Bill Deleted";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/************************************UPDATION OF Bill ******************************************** */
router.put('/paid', (request, response) => {
    let sentResponse = {};
    let billId = request.body.billId;
    let amount_paid = request.body.amount_paid;
    console.log('result.amount_paid',amount_paid)
    bill.findById({ _id: billId }, (error, result) => {
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
                result.total=result.total- result.amount_paid 
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