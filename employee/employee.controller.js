const express = require('express');
const router = express.Router();
const employee = require('./employee.model');
const user = require('../user/user.model');

/************************* EMPLOYEE Creation *************************/
router.post('/create', (request, response) => {
    let employeeResponse = {};
    let data = new employee({
        name: request.body.name,
        phoneNumber: request.body.phoneNumber,
        aadhar: request.body.aadhar,
        voterId: request.body.voterId,
        others:request.body.others,
        others:request.body.others,
        picture: request.body.picture,
        userId: request.body.userId,
        organisation: request.body.organisation,
    });
    console.log(data);
    user.findById({ _id: data.userId }, (error, result) => {
        console.log('result error', error);
        console.log('result result', result);
        if (error) {
            console.log(error);
            employeeResponse.error = true;
            employeeResponse.message = `Error :` + " User does not exist";
            response.status(500).json(employeeResponse);
        } else {
            data.save((error, result) => {
                console.log('user error', error);
                console.log('user result', result);
                if (error) {
                    console.log(error);
                    employeeResponse.error = true;
                    employeeResponse.message = `Error :` + " creation failed";
                    response.status(500).json(employeeResponse);
                } else {
                    employeeResponse.error = false;
                    employeeResponse.result = result;
                    employeeResponse.message = `Employee is created  successfull.`;
                    response.status(200).json(employeeResponse);
                }
            })
        }
    })
});
/************************************END ******************************************** */
/************************** EMPLOYEE DETAIL BY USERID ********************************************** */
router.get('/employeeByUserId', (request, response) => {
    let userId = request.query.userId;
    let sentResponse = {};
    employee.find({ userId: userId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + "User Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Employee List";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/******************************* DELETE BY ID *******************************/
router.delete('/delete', (request, response) => {
    let employeeId = request.query.employeeId
    let sentResponse = {}
    employee.remove({ _id: employeeId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Employee not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Employee Deleted";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
module.exports = router;