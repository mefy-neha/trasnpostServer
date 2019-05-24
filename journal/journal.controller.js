const express = require('express');
const router = express.Router();
const journal = require('./journal.model');
const journal1 = require('./journal1.model');

const user = require('../user/user.model');
const period = require('../period/period.model');


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
                    period.findOne({ period_status: 'open' }, (error, period) => {
                        console.log('erroor', error)
                        console.log('period', period)

                        if (error || period == null) {
                            journalResponse.error = true;
                            journalResponse.message = `Error :` + error.message + 'Period does not exist';
                            response.status(500).json(journalResponse);
                        }
                        else {
                            let data = new journal({
                                date: request.body.date,
                                journalNumber: list.length + 1,
                                reference: request.body.reference,
                                // description: request.body.description,
                                detail: request.body.detail,
                                notes: request.body.notes,
                                posted: false,
                                period: period.period_name,
                                total: request.body.total,
                                // contactPersonId: request.body.contactPersonId,
                                denomination: request.body.denomination ? request.body.denomination : null,
                                total_amount: request.body.total_amount,
                                userId: request.body.userId,
                                // accountId: request.body.accountId,
                                // debit: request.body.debit ? request.body.debit : null,
                                // credit: request.body.credit ? request.body.credit : null,
                            });
                            data.superAdminId = superAdmin;
                            data.organisation = org
                            // console.log(data);
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
                    // console.log('listing',list)
                    period.findOne({ period_status: 'open' }, (error, period) => {
                        console.log('erroor', error)
                        console.log('period', period)

                        if (error || period == null) {
                            journalResponse.error = true;
                            journalResponse.message = `Error :` + error.message + 'Period does not exist';
                            response.status(500).json(journalResponse);
                        }
                        else {

                            let data = new journal({
                                date: request.body.date,
                                journalNumber: list.length + 1,
                                reference: request.body.reference,
                                detail: request.body.detail,
                                organisation: request.body.organisation,
                                notes: request.body.notes,
                                posted: false,
                                period: period.period_name,
                                denomination: request.body.denomination ? request.body.denomination : null,
                                total_amount: request.body.total_amount,
                                total: request.body.total,
                                userId: request.body.userId,

                            });
                            data.superAdminId = superAdmin;
                            data.organisation = org
                            // console.log(data);
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

                            });
                        }



                    })

                }
            })


        }
    })
})
/************************************END ******************************************** */

/******************************CREATION OF JOURNAL AS A SABE AS DRAFT ***************************8 */
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
                date: request.body.date,
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
                date: request.body.date,
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
                    period.findOne({ period_status: 'open' }, (error, period) => {
                        console.log(' period erroor', error)
                        console.log('period result', period)

                        if (error || period == null) {
                            journalResponse.error = true;
                            journalResponse.message = `Error :` + error.message + 'Period does not exist';
                            response.status(500).json(journalResponse);
                        }
                        else {
                            let journaldata = new journal({
                                date: (request.body.date ? (request.body.date) : result.date),
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
                                period: period.period_name,
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
    user.findById({ _id: superAdminId }, (error, result) => {
        console.log('error...........', error);
        console.log('result', result);
        if (error || result == null) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error + '  ' + "User Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            console.log('role superadmin')
            journal.find({ superAdminId: superAdminId }, (error, result) => {
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



module.exports = router;