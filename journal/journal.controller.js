const express = require('express');
const router = express.Router();
const journal = require('./journal.model');
const journal1 = require('./journal1.model');

const user = require('../user/user.model');
const period = require('../period/period.model');
const moment = require('moment');


/************************ JOURNAL CREATION (during save)**************************/

router.post('/create', (request, response) => {
    let journalResponse = {};
    console.log(request.body.userId)
    user.findById({ _id: request.body.userId }, (error, result) => {
        console.log('user error', error);
        console.log('user result', result);
        if (error || result == null) {
            journalResponse.error = true;
            journalResponse.message = `Error :` + " User Does not exist";
            response.status(500).json(journalResponse);
        }
        else if (result.role == 'superAdmin') {
            console.log('superAdmin')
            let superAdmin = {}
            let org = {};
            superAdmin = result._id,
                org = result.organisation
            console.log('iddddd', superAdmin)
            journal.find({ superAdminId: superAdmin }, (error, list) => {
                console.log('error', error);
                console.log(' journal length', list.length)
                if (error) {
                    journalResponse.error = true;
                    journalResponse.message = `Error :` + error.message + 'Organisation does not exist';
                    response.status(500).json(journalResponse);
                }
                else {

                    let data = new journal({
                        date: request.body.date ? moment(request.body.date).format('YYYY-MM-DD') : null,
                        journalNumber: list.length + 1,
                        reference: request.body.reference,
                        detail: request.body.detail,
                        notes: request.body.notes,
                        posted: false,
                        total: request.body.total,
                        denomination: request.body.denomination ? request.body.denomination : null,
                        total_amount: request.body.total_amount,
                        userId: request.body.userId,

                    });
                    data.superAdminId = superAdmin;
                    data.organisation = org
                    // moment('2010-10-20').isBetween('2010-10-19', '2010-10-25');
                    period.find({ superAdminId: data.superAdminId }, (error, period) => {
                        // console.log('erroor', error)
                        // console.log('period', period)

                        if (error || period == null) {
                            journalResponse.error = true;
                            journalResponse.message = `Error :` + error.message + 'Period does not exist';
                            response.status(500).json(journalResponse);
                        }
                        else if (period && period.length != 0) {
                            datetapped(data.date, period).then(periodresult => {
                                console.log('result///////', periodresult)
                                data.period = periodresult.length!=0?periodresult[0].period_name:null
                                console.log(data);
                                data.save((error, result) => {
                                    console.log('Journal error', error);
                                    console.log('Journal result', result);
                                    if (error) {
                                        console.log(error);
                                        journalResponse.error = true;
                                        journalResponse.message = `Error :` + "Journal Creation Failed";
                                        response.status(500).json(journalResponse);
                                    } else {
                                        journalResponse.error = false;
                                        journalResponse.user = result;
                                        journalResponse.message = `Journal Created  successfull.`;
                                        response.status(200).json(journalResponse);

                                    }

                                });
                            })
                        }



                    })


                }
            })
        }
        else {
            superAdmin = result.superAdminId._id
            org = result.superAdminId.organisation
            console.log('iddddd ,,,,,,', superAdmin)
            journal.find({ superAdminId: superAdmin }, (error, list) => {
                console.log('error', error);
                console.log(' journal length', list.length)

                // console.log(' journal length', list)
                if (error) {
                    journalResponse.error = true;
                    journalResponse.message = `Error :` + error.message + 'Organisation does not exist';
                    response.status(500).json(journalResponse);
                }
                else {
                    let data = new journal({
                        date: request.body.date ? moment(request.body.date).format('YYYY-MM-DD') : null,
                        journalNumber: list.length + 1,
                        reference: request.body.reference,
                        detail: request.body.detail,
                        organisation: request.body.organisation,
                        notes: request.body.notes,
                        posted: false,
                        denomination: request.body.denomination ? request.body.denomination : null,
                        total_amount: request.body.total_amount,
                        total: request.body.total,
                        userId: request.body.userId,

                    });
                    data.superAdminId = superAdmin;
                    data.organisation = org
                    // console.log(data);
                    period.find({ superAdminId: data.superAdminId }, (error, period) => {
                        console.log('erroor', error)
                        console.log('period', period)

                        if (error || period == null) {
                            journalResponse.error = true;
                            journalResponse.message = `Error :` + error.message + 'Period does not exist';
                            response.status(500).json(journalResponse);
                        }
                        else if (period && period.length != 0) {
                            datetapped(data.date, period).then(periodresult => {
                                console.log('result///////', periodresult)
                                data.period = periodresult.length!=0?periodresult[0].period_name:null
                                data.save((error, result) => {
                                    console.log('Journal error', error);
                                    // console.log('Journal result', result);
                                    if (error) {
                                        console.log(error);
                                        journalResponse.error = true;
                                        journalResponse.message = `Error :` + "Journal Creation Failed";
                                        response.status(500).json(journalResponse);
                                    } else {
                                        journalResponse.error = false;
                                        journalResponse.user = result;
                                        journalResponse.message = `Journal Created  successfull.`;
                                        response.status(200).json(journalResponse);

                                    }
                                })
                            });
                        }



                    })

                }
            })


        }
    })
})
/************************************END ******************************************** */

/******************************CREATION OF JOURNAL SAVE AS DRAFT ***************************8 */
router.post('/draft', (request, response) => {
    let draftRespone = {};
    user.findById({ _id: request.body.userId }, (error, result) => {
        console.log('user error', error);
        console.log('user result', result);
        if (error || result == null) {
            draftRespone.error = true;
            draftRespone.message = `Error :` + " User Does not exist";
            response.status(500).json(draftRespone);
        }
        else if (result.role == 'superAdmin') {
            let newData = new journal1({
                date: request.body.date ? moment(request.body.date).format('YYYY-MM-DD') : null,
                reference: request.body.reference,
                detail: request.body.detail,
                notes: request.body.notes,
                posted: false,
                status: request.body.status ? request.body.status : null,
                total: request.body.total,
                denomination: request.body.denomination ? request.body.denomination : null,
                total_amount: request.body.total_amount,
                userId: request.body.userId,
            })
            newData.superAdminId = result._id,
                newData.organisation = result.organisation
            newData.save((error, result) => {
                console.log('Journal  draft error', error);
                console.log('Journal  draft result', result);
                if (error) {
                    console.log(error);
                    draftRespone.error = true;
                    draftRespone.message = `Error :` + "Journal Creation Failed";
                    response.status(500).json(draftRespone);
                } else {
                    draftRespone.error = false;
                    draftRespone.user = result;
                    draftRespone.message = `Journal Created as Draft  successfull.`;
                    response.status(200).json(draftRespone);

                }

            });
        }
        else {
            let newData = new journal1({
                date: request.body.date ? moment(request.body.date).format('YYYY-MM-DD') : null,
                reference: request.body.reference,
                notes: request.body.notes,
                posted: false,
                status: request.body.status ? request.body.status : null,
                total: request.body.total,
                denomination: request.body.denomination ? request.body.denomination : null,
                total_amount: request.body.total_amount,
                userId: request.body.userId,
                detail: request.body.detail
            })
            newData.superAdminId = result.superAdminId._id,
                newData.organisation = result.superAdminId.organisation
            newData.save((error, result) => {
                console.log('Journal  draft error', error);
                console.log('Journal  draft result', result);
                if (error) {
                    console.log(error);
                    draftRespone.error = true;
                    draftRespone.message = `Error :` + "Journal Creation Failed";
                    response.status(500).json(draftRespone);
                } else {
                    draftRespone.error = false;
                    draftRespone.user = result;
                    draftRespone.message = `Journal Created as Draft  successfull.`;
                    response.status(200).json(draftRespone);

                }

            });
        }

    });
})


/************************************END ******************************************** */
/*************************************** UPDATE TAPP WITH THEIR ID **************************/
router.put('/update', (request, response) => {
    let sentresponse = {}
    let journalId = request.body.journalId;
    console.log('request', request.body)
    journal1.findById({ _id: journalId }, (error, result) => {
        console.log('error.....', error);
        console.log('result.....', result);
        if (error || result == null) {
            sentresponse.error = true;
            sentresponse.message = `Error :` + error + 'Id does not exist';
            response.status(500).json(sentresponse);
        } else if (result) {
            journal.find({ superAdminId: result.superAdminId }, (error, list) => {
                console.log(' journal list', list.length)
                // console.log(' journal list', list)
                // console.log('list organisation', list[0].organisation)

                if (error) {
                    sentresponse.error = true;
                    sentresponse.message = `Error :` + error + 'Something went wrong';
                    response.status(500).json(sentresponse);
                }
                else {
                    period.find({ superAdminId: result.superAdminId }, (error, period) => {
                        console.log('erroor', error)
                        console.log('period', period)

                        if (error || period == null) {
                            journalResponse.error = true;
                            journalResponse.message = `Error :` + error.message + 'Period does not exist';
                            response.status(500).json(journalResponse);
                        }
                        else if (period && period.length != 0) {
                            datetapped(data.date, period).then(periodresult => {
                                console.log('result///////', periodresult)
                        
                            let journaldata = new journal({
                                date: (request.body.date ? (moment(request.body.date).format('YYYY-MM-DD')) : result.date),
                                reference: request.body.reference,
                                notes: (request.body.notes ? (request.body.notes) : result.notes),
                                posted: false,
                                total: (request.body.total ? (request.body.total) : result.total),
                                denomination: (request.body.denomination ? (request.body.denomination) : result.denomination),
                                total_amount: (request.body.total_amount ? (request.body.total_amount) : result.total_amount),
                                detail: (request.body.detail ? (request.body.detail) : result.detail),
                                journalNumber: list.length + 1,
                                superAdminId: list[0].superAdminId,
                                organisation: list[0].organisation,
                                period: periodresult.length!=0?periodresult[0].period_name:null
                            })
                            journaldata.save((error, result) => {
                                console.log('error.....', error);
                                console.log('result.....', result);
                                if (error || result === null) {
                                    sentresponse.error = true;
                                    sentresponse.message = `Error :` + error + 'Not updated';
                                    response.status(500).json(sentresponse);
                                } else {
                                    sentresponse.error = false;
                                    sentresponse.result = result;
                                    sentresponse.message = `Journal Created.`;
                                    response.status(200).json(sentresponse);
                                }

                            });
                        })
                        }
                    })
                }

            })
        }

    })

})
/*********************************************** ENDS ******************************************* */
/************************** JOURNAL LIST BY SUPERADMIN OR ADMIN ********************************************** */
router.get('/journalList', (request, response) => {
    let superAdminId = request.query.superAdminId;
    let sentResponse = {};
    user.findById({ _id: superAdminId },(error, result) => {
        console.log('error...........', error);
        console.log('result', result);
        if (error || result == null) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error + '  ' + "User Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            console.log('role superadmin')
            journal.find({ superAdminId: superAdminId }).populate('detail.accountId').populate('detail.contactPersonId').exec((error, result) => { 
                console.log('error', error);
                console.log('result', result);
                if (error) {
                    sentResponse.error = true;
                    sentResponse.message = `Error :` + error.message + "Something went wrong";
                    response.status(500).json(sentResponse);
                }
                else {
                    sentResponse.error = false;
                    sentResponse.message = "Journal List";
                    sentResponse.result = result
                    response.status(200).json(sentResponse);

                }

            })
        }
    })
})
/************************************END ******************************************** */


function datetapped(startDate, list) {
    // console.log('dte',startDate, list)
    let datearray = [];
    return new Promise((resolve, reject) => {
        list.forEach(element => {
            let fromdate = moment(element.from ).format('YYYY-MM-DD');
            let todate = moment(element.to).format('YYYY-MM-DD');
            // console.log('datesssss', fromdate, todate, startDate)
            console.log(moment(startDate).isBetween(fromdate, todate, null, '[]'))
            if (moment(startDate).isBetween(fromdate, todate,  null, '[]')) {
                console.log('date matched')
                datearray.push(element);
                // console.log('datearray', datearray)
            }
        })
        resolve(datearray)
    })
}
/************************************END ******************************************** */

/********************************JOURNAL BY ID ************************* */
router.get('/journalById',(request,response)=>{
let journalId=request.query.journalId;
let sentResponse = {};
journal.findById({_id:journalId}).populate('detail.accountId').populate('detail.contactPersonId').exec((error, result) => { 
    if (error) {
        sentResponse.error = true;
        sentResponse.message = `Error :` + error.message + "Something went wrong";
        response.status(500).json(sentResponse);
    }
    else {
        sentResponse.error = false;
        sentResponse.message = "Journal List";
        sentResponse.result = result
        response.status(200).json(sentResponse);

    } 
})
})
/************************************END ******************************************** */
/************************************LASER REPORT ******************************************** */
router.get('/resport',(request,response)=>{
    let accountCode_from=request.query.accountCode_from;
    let accountCode_to=request.query.accountCode_to;
    let from=request.query.from;
    let to=request.query.to;
    
})
/************************************END ******************************************** */

module.exports = router;
// 2019-06-07T04:12:09.288Z -iso format
