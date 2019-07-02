const express = require('express');
const router = express.Router();
const period = require('./period.model');
const user = require('../user/user.model');
const moment = require('moment');

/************************************PERIOD CREATION ******************************************** */

router.post('/create', (request, response) => {
    let periodResponse = {};
    let data = new period({
        period_name: request.body.period_name,
        period_status: request.body.period_status,
        from: request.body.from?request.body.from:null,
        to: request.body.to?request.body.to:null,
        quarter_start: request.body.quarter_start?request.body.quarter_start:null,
        quarter_end: request.body.quarter_end? request.body.quarter_end:null,
        fiscle_year: request.body.fiscle_year,
        assessment_year: request.body.assessment_year,     
        userId: request.body.userId
    })
    console.log('dataaaa', data)

    user.findById({ _id: data.userId }, (error, result) => {
        console.log('result error', error);
        console.log('result result', result);
        if (error) {
            console.log(error);
            periodResponse.error = true;
            periodResponse.message = `Error :` + " User does not exist";
            response.status(500).json(periodResponse);
        }
        else {
            data.role = result.role,
                data.organisation = result.organisation
            if (result.role == 'superAdmin') {
                console.log('superAdmin')
                data.superAdminId = result._id
                data.save((error, result) => {
                    console.log('Period error', error);
                    console.log('Period result', result);
                    if (error || result == null) {
                        periodResponse.error = true;
                        periodResponse.message = `Error :` + "Creation failed";
                        response.status(500).json(periodResponse);
                    } else {

                        periodResponse.error = false;
                        periodResponse.result = result;
                        periodResponse.message = `Period is created  successfull.`;
                        response.status(200).json(periodResponse);
                    }
                })
            }
            else {
                console.log('admin,other')
                data.superAdminId = result.superAdminId._id
                data.save((error, result) => {
                    console.log('Customer error', error);
                    console.log('Customer result', result);
                    if (error || result == null) {
                        periodResponse.error = true;
                        periodResponse.message = `Error :` + "Creation failed";
                        response.status(500).json(periodResponse);
                    } else {

                        periodResponse.error = false;
                        periodResponse.result = result;
                        periodResponse.message = `Period is created  successfull.`;
                        response.status(200).json(periodResponse);
                    }
                })
            }
        }

    })

})
/************************************END ******************************************** */

/************************** BANK DETAIL BY SUPERADMINID ********************************************** */
router.get('/periodList', (request, response) => {
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
            period.find({ superAdminId: superAdminId }, (error, result) => {
                console.log('error', error);
                console.log('result', result);
                if (error) {
                    sentResponse.error = true;
                    sentResponse.message = `Error :` + error.message + "Something went wrong";
                    response.status(500).json(sentResponse);
                }
                else {
                    sentResponse.error = false;
                    sentResponse.message = "Period List";
                    sentResponse.result = result
                    response.status(200).json(sentResponse);

                }

            })
        }
    })
})
/************************************END ******************************************** */
module.exports = router;