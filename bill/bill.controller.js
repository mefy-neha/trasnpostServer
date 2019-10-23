const express = require('express');
const router = express.Router();
const bill = require('./bill.model');
const user = require('../user/user.model');
const moment = require('moment');
/************************************BANK CREATION ******************************************** */
router.post('/create', (request, response) => {
    let invoiceResponse = {};
    let data = new bill({
        vendorId: request.body.vendorId ? request.body.vendorId : null,
        contractId: request.body.contractId ? request.body.contractId : null,
        work_order: request.body.work_order,
        bill_date: request.body.bill_date ? moment(request.body.bill_date).format('YYYY-MM-DD') : null,
        terms: request.body.terms,
        due_date: request.body.due_date ? moment(request.body.due_date).format('YYYY-MM-DD') : null,
        sub_total: request.body.sub_total,
        total: request.body.total,
        amount_due: request.body.total,
        amount_paid: request.body.amount_paid ? request.body.amount_paid : null,
        status: request.body.status,
        adjustment: request.body.adjustment,
        tds: request.body.tds,
        items_details: request.body.items_details,
        reverse_change: request.body.reverse_change,
        notes: request.body.notes ? request.body.notes : null,
        discount: request.body.discount ? request.body.discount : null,
        customer_notes: request.body.customer_notes ? request.body.customer_notes : null,
        userId: request.body.userId
    })
    if (request.body.period != null) {
        data.period = {
            start_date: request.body.period.start_date ? moment(request.body.period.start_date).format('YYYY-MM-DD') : null,
            end_date: request.body.period.end_date ? moment(request.body.period.end_date).format('YYYY-MM-DD') : null
        }
        console.log('gst', data.period)
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
                        data.bill_number = 'BILL-00' + y
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
                        data.bill_number = 'BILL-00' + x
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
// . populate('vendorId').exec((error, result) => { 
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
            sentResponse.message = "ALL Bill  List";
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
            bill.find({ superAdminId: superAdminId }).populate('items_details.cosignmentId').sort({createdDate: -1}).exec((error, result) => {
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
                    sentResponse.count = result.length
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
    console.log('result.amount_paid', amount_paid)
    bill.findById({ _id: billId }, (error, result) => {
        console.log('error', error)
        // console.log('result', result)
        if (error || result == null) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentResponse);
        }
        else if (result.total == amount_paid) {
            console.log('result.total', result.total)
            console.log('paid')
            result.status = (request.body.status ? (request.body.status) : 'paid');
            result.amount_paid = (request.body.amount_paid ? (request.body.amount_paid) : result.amount_paid);
            result.amount_due = result.amount_due - result.amount_paid
            result.save((error, result) => {
                console.log('error', error)
                // console.log('result', result)
                sentResponse.error = false;
                sentResponse.message = "Invoice Updated";
                sentResponse.result = result
                response.status(200).json(sentResponse);


            })
        }
        else if (result) {
            console.log('result', result.total, result.amount_paid)
            result.amount_paid = (request.body.amount_paid ? (request.body.amount_paid) : result.amount_paid);
            result.amount_due = result.amount_due - result.amount_paid
            console.log('total', result.total)
            result.save((error, result) => {
                console.log(' save error', error)
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
/***********************LAST 7 DAYS FROM CURRENT DATE BILL LIST ***********************************/
/*******************************  TAPPED ITEMS 7 DAYS BEFORE DATE OF THAT S USERID ************************** */
// router.get('/usersevendays', (request, response) => {
//     console.log('items tapped in a date 7 days');
//     console.log(request.query.superAdminId)
//     let sentresponse = {};
//     // var now = moment().format('YYYY-MM-DD');
//     // console.log('currentDate', now);
//     var lastWeek = moment().format('YYYY-MM-DD');
// lastWeek.setDate(lastWeek.getDate() -7);
//         //2019-01-31T06:59:12.039Z month format to be sent
//     bill.find({ superAdminId: request.query.superAdminId },{ "createdDate": { $gte: lastWeek} } ).sort({ "createdDate": -1 }).exec(function (error, list) {
//         console.log(error);
//         console.log('list', list);
//         if (error) {
//             sentresponse.error = true;
//             sentresponse.message = 'Error:' + error.message;
//             response.status(500).json(sentresponse);
//         }
//         else if (list && list.length != 0) {
//             // seven_days_tapped(now, list).then(result => {
//             //     console.log(result)
//             //     sentresponse.error = false;
//             //     sentresponse.message = "Date Tapped Items";
//             //     sentresponse.result = result;
//             //     response.status(200).json(sentresponse);
//             // })
//             sentresponse.error = false;
//             sentresponse.result = result;
//             sentresponse.message = 'Error:' + error.message;
//             response.status(200).json(sentresponse);
//         }
//         else {
//             sentresponse.error = false;
//             sentresponse.message = "No Items Tapped this month";
//             sentresponse.result = [];
//             response.status(200).json(sentresponse);
//         }
//     })

// })



/************************************END ******************************************** */

/***************************************** INSTANCE 7 DAYS BEFORE THTA DATE **************************** */
function seven_days_tapped(inputdate, list) {
    let datearray = [];



    return new Promise((resolve, reject) => {
        list.forEach(element => {
            let dbdate = moment(element.createdDate, "YYYY-MM-DD");
            // let requestdate=moment(inputdate,"YY-MM-DD");            //filter list according to month
            console.log((dbdate));
            // console.log(requestdate)

            // var a = moment([2007, 0, 29]);
            // var b = moment([2007, 0, 28]);
            console.log('DIFF BETWEEN DAYS', inputdate.diff(dbdate, 'days'));
            //    console.log('DIFF BETWEEN ',enddate.diff(dbdate,'days'));
            // a.diff(b, 'days') // 1



            if (inputdate.diff(dbdate, 'days') == 0 || inputdate.diff(dbdate, 'days') == 1 || inputdate.diff(dbdate, 'days') == 2 || inputdate.diff(dbdate, 'days') == 3 || inputdate.diff(dbdate, 'days') == 4 || inputdate.diff(dbdate, 'days') == 5 || inputdate.diff(dbdate, 'days') == 6) {
                console.log('date matched', inputdate.diff(dbdate, 'days'))
                datearray.push(element);
                // console.log(montharray)
            }
        })
        resolve(datearray)
    })
}
/********************************************************************************************* */
/******************************* BILL BY ID *******************************/
router.get('/billById', (request, response) => {
    let billId = request.query.billId
    let sentResponse = {}
    bill.findById({ _id: billId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Bill Detail";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */

/*****************  BILL HISTORY ACCORDING TO USERID AND BETWEEN TWO DATES ************ */
router.get('/billBetweenDate', (request, response) => {
    console.log('request ', request.query);   //userId,startDate,endDate
    let sentresponse = {};
    let superAdminId = request.query.superAdminId;
    let to = moment().format('YYYY-MM-DD');
    // console.log('currentDate', to);
    let from = moment(request.query.from).format('YYYY-MM-DD');
    console.log('dates', from, to)
    bill.find({ superAdminId: superAdminId }, (error, result) => {
        console.log('error...', error);
        // console.log(result);
        if (error) {
            sentresponse.error = true;
            sentresponse.message = 'Error:' + error.message + 'Does not exist';
            response.status(500).json(sentresponse);
        }
        else if (result && result.length != 0) {
            // find milage between dates
            billBetweenDates(from, to, result).then(billlist => {

                sentresponse.error = false;
                sentresponse.result = billlist;
                sentresponse.message = `Bill  list get succesfully .`;
                response.status(200).json(sentresponse);
            })
        }
        else {
            sentresponse.error = false;
            sentresponse.result = result;
            sentresponse.message = `Bill getting  successfully .`;
            response.status(200).json(sentresponse);

        }
    })

})

/****************************************** ENDS ***************************************** */

/****************************** COMAPRE IF INPUT DATE IS VETWEEN TWO DATES ******************* */
function billBetweenDates(startDate, endDate, list) {
    let datearray = [];
    console.log('date', startDate, endDate)
    return new Promise((resolve, reject) => {
        list.forEach(element => {                  //filter list according to date comparison
            // console.log(moment(element.createdDate, "YYYY-MM-DD"))
            let dbdate = moment(element.createdDate).format('YYYY-MM-DD');
            // console.log(moment(inputdate).isSame(dbdate,'date'))
            if (moment(startDate).isSame(endDate, 'date')) {
                if (moment(startDate).isSame(dbdate, 'date')) {
                    datearray.push(element);
                }
            }
            else {
                if (moment(dbdate).isBetween(startDate, endDate, null, '[]')) {
                    console.log('date matched')
                    datearray.push(element);
                    // console.log(montharray)
                }
            }

        })
        resolve(datearray)
    })
}
/************************************* ENDS ********************************************* */
/************************************UPDATION OF Bill ******************************************** */
router.put('/consignmentPaid', (request, response) => {
    let sentResponse = {};
    let billId = request.body.billId;
    let cosignmentId=request.body.cosignmentId;
    console.log('result.amount_paid', billId, cosignmentId)
    bill.findById({ _id: billId }, (error, result) => {
        console.log('error', error)
        // console.log('result', result)
        if (error || result == null) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentResponse);
        }
        let items = []
        for (let i = 0; i < result.items_details.length; i++) {
            if (cosignmentId == result.items_details[i].cosignmentId) {
                items.push(result.items_details[i])
            }

        }
        let consig_bill=[{
            _id: items[0]._id, serial_number: items[0].serial_number, cosignmentId: cosignmentId , description: items[0].description, amount: items[0].amount ,amount_status:items[0].amount_status
        }]
        let new_consig_bill= consig_bill
         new_consig_bill.push({
            _id: items[0]._id, serial_number: items[0].serial_number, cosignmentId:cosignmentId, description: items[0].description, amount: items[0].amount, departmental_deduction: request.body.departmental_deduction,tds: request.body.tds,shortage: request.body.shortage,gst_tds: request.body.gst_tds,ccms: request.body.ccms,paymentDate: request.body.paymentDate, paid_amount: request.body.paid_amount, due_amount: request.body.due_amount ? request.body.due_amount : null, amount_status: request.body.status ? items[0].amount_status : items[0].amount_status
        })
        bill.findOneAndUpdate({ _id:  request.body.billId  }, { $push: { bill_updation: new_consig_bill } }, { new: true }, (error, result) => {
            console.log('error', error);
            console.log('result', result);
                           if (error) {
                        sentResponse.error = true;
                        sentResponse.message = `Error :` + error.message + " not update";
                        response.status(500).json(sentResponse);
                    }
                    else {
                        sentResponse.error = false;
                        sentResponse.message = "Bill Updated";
                        sentResponse.result = result
                        response.status(200).json(sentResponse);
                    }
            
        })
     
})
})
/************************************END ******************************************** */
module.exports = router;