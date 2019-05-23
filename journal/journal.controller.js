const express = require('express');
const router = express.Router();
const journal = require('./journal.model');
const user = require('../user/user.model');
const period = require('../period/period.model');


/************************ JOURNAL CREATION **************************/

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
            let superAdmin={}
            let org ={};
           superAdmin = result._id,
           org = result.organisation
            console.log('iddddd', superAdmin)
            journal.find({ userId: superAdmin}, (error, result) => {
                console.log('error', error);
                console.log('length', result)
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
                                journalNumber: result.length + 1,
                                reference: request.body.reference,
                                description: request.body.description,
                                notes: request.body.notes,
                                journalType: false,
                                status: request.body.status,
                                posted: false,
                                period: period.period_name,
                                total: request.body.total,
                                contactPersonId: request.body.contactPersonId,
                                userId: request.body.userId,
                                accountId: request.body.accountId,
                                debit: request.body.debit ? request.body.debit : null,
                                credit: request.body.credit ? request.body.credit : null,
                            });
                            data.superAdminId=superAdmin;
                            data.organisation=org
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
           superAdmin= result.superAdminId._id
           org = result.superAdminId.organisation
            console.log('iddddd', superAdmin)
            journal.find({ userId:superAdmin }, (error, result) => {
                console.log('error', error);
                console.log('length', result)
                if (error) {
                    journalResponse.error = true;
                    journalResponse.message = `Error :` + error.message + 'Organisation does not exist';
                    response.status(500).json(journalResponse);
                }
                else {
                    period.findOne({ period_status: 'open' }, (error, period) => {
                        console.log('erroor', error)
                        console.log('period', period)

                        if (error || period== null) {
                            journalResponse.error = true;
                            journalResponse.message = `Error :` + error.message + 'Period does not exist';
                            response.status(500).json(journalResponse);
                        }
                        else {

                            let data = new journal({
                                date: request.body.date,
                                journalNumber: result.length + 1,
                                reference: request.body.reference,
                                description: request.body.description,
                                organisation: request.body.organisation,
                                notes: request.body.notes,
                                journalType: false,
                                status: request.body.status,
                                posted: false,
                                period: period.period_name,
                                total: request.body.total,
                                contactPersonId: request.body.contactPersonId,
                                userId: request.body.userId,
                                accountId: request.body.accountId,
                                debit: request.body.debit ? request.body.debit : null,
                                credit: request.body.credit ? request.body.credit : null,
                            });
                            data.superAdminId=superAdmin;
                            data.organisation=org
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
/************************** JOURNAL DETAIL BY USERID ********************************************** */
router.get('/journalByUserId', (request, response) => {
    let userId = request.query.userId;
    let sentResponse = {};
    journal.find({ userId: userId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + "User Does not exist";
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
/************************** JOURNAL DETAIL BY SUPERADMINID ********************************************** */
router.get('/journal', (request, response) => {

    let sentResponse = {};
    let journalResponse = {};
    let userId = request.query.userId;
    user.findById({ _id: userId }, (error, result) => {
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
            superAdmin = result._id
            console.log('iddddd', superAdmin)
            journal.find({ userId: superAdmin }, (error, result) => {
                console.log('error', error);
                console.log('lengthsuperadmin', result.length)

                console.log('length', result)
                if (error) {
                    journalResponse.error = true;
                    journalResponse.message = `Error :` + error.message + 'Organisation does not exist';
                    response.status(500).json(journalResponse);
                }
                else {
                    sentResponse.error = false;
                    sentResponse.message = "Journal List";
                    sentResponse.result = result
                    response.status(200).json(sentResponse);
                }


            })
        }
        else {
            superAdmin = result.superAdminId._id
            console.log('iddddd', superAdmin)

            journal.find({ userId: superAdmin }, (error, result) => {
                console.log('error', error);
                console.log('lengthrolleeeee', result.length)

                console.log('length', result)
                if (error) {
                    journalResponse.error = true;
                    journalResponse.message = `Error :` + error.message + 'Organisation does not exist';
                    response.status(500).json(journalResponse);
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






























    // journal.find({ userId: userId }, (error, result) => {
    //     console.log('error', error);
    //     console.log('result', result);
    //     if (error) {
    //         sentResponse.error = true;
    //         sentResponse.message = `Error :` + error.message + "User Does not exist";
    //         response.status(500).json(sentResponse);
    //     }
    //     else {
    //         sentResponse.error = false;
    //         sentResponse.message = "Journal List";
    //         sentResponse.result = result
    //         response.status(200).json(sentResponse);

    //     }

    // })
})
/************************************END ******************************************** */



module.exports = router;