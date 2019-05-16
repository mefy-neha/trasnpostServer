const express = require('express');
const router = express.Router();
const journal = require('./journal.model');
const user = require('../user/user.model');

/************************ JOURNAL CREATION **************************/

router.post('/create', (request, response) => {
    let journalResponse = {};
    console.log('companyId',request.body.companyId)
    journal.find({companyId:request.body.companyId}, (error, result) => {
        console.log('error', error);
        console.log('length', result)
        if (error) {
            journalResponse.error = true;
            journalResponse.message = `Error :` + error.message +'Copmany does not exist';
            response.status(500).json(journalResponse);
        }
        else {
            let data = new journal({
                date: request.body.date,
                journalNumber: result.length+1,
                reference: request.body.reference,
                description: request.body.description,
                notes: request.body.notes,
                journalType: false,
                contactPersonId: request.body.contactPersonId,
                userId: request.body.userId,
                accountId: request.body.accountId,
                companyId: request.body.companyId,
                debit: request.body.debit ? request.body.debit : null,
                credit: request.body.credit ? request.body.credit : null,
            });
            console.log(data);
            user.findById({ _id: data.userId }, (error, result) => {
                console.log('user error', error);
                console.log('user result', result);
                if (error || result == null) {
                    journalResponse.error = true;
                    journalResponse.message = `Error :` + " User Does not exist";
                    response.status(500).json(journalResponse);
                }
                else {
                    data.save((error, result) => {
                        console.log('Journal error', error);
                        console.log('Journal result', result);
                        if (error) {
                            console.log(error);
                            journalResponse.error = true;
                            journalResponse.message = `Error :` + "Something Went Wrong";
                            response.status(500).json(journalResponse);
                        } else {
                            console.log(result);
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



module.exports = router;