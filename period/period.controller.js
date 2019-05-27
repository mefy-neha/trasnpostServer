const express = require('express');
const router = express.Router();
const period = require('./period.model');
const user = require('../user/user.model');

/************************************PERIOD CREATION ******************************************** */


router.post('/create', (request, response) => {
    let periodResponse = {};
    let data = new period({
        period_name: request.body.period_name,
        period_status: request.body.period_status?request.body.period_status:null,
        from: request.body.from,
        to: request.body.to,
        userId: request.body.userId
    })
    console.log('dataaaa', data)

    user.findById({ _id: data.userId }, (error, result) => {
        console.log('result error', error);
        console.log('result result', result);
        if (error) {
            console.log(error);
            customerResponse.error = true;
            customerResponse.message = `Error :` + " User does not exist";
            response.status(500).json(customerResponse);
        }
        else{
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








/************************************END ******************************************** */
module.exports = router;