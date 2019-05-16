const express = require('express');
const router = express.Router();
const fleet = require('./fleet.model');
const user = require('../user/user.model')


/*************************FLEET CREATION *************************/
router.post('/create', (request, response) => {
    let fleetResponse = {};
    console.log('request', request.body)
    let data = new fleet({
        truck_number: request.body.truck_number,
        ownership: request.body.ownership,
        userId: request.body.userId,
        superAdminId: request.body.superAdminId,
        rc: {
            number: request.body.rc ? (request.body.rc.number) : null,
            doc: request.body.rac ? (request.body.rc.doc) : null,
            valid_upto: request.body.rc ? (request.body.rc.valid_upto) : null,
        },
        insurance: {
            number: request.body.insurance ? (request.body.insurance.number) : null,
            doc: request.body.insurance ? (request.body.insurance.doc) : null,
            valid_upto: request.body.insurance ? (request.body.insurance.valid_upto) : null,
        }

    });
    console.log(data);
    user.findById({ _id: data.userId }, (error, result) => {
        console.log('user error', error);
        console.log('user result', result);
        if (error || result == null) {
            fleetResponse.error = true;
            fleetResponse.message = `Error :` + " User Does not exist";
            response.status(500).json(fleetResponse);
        }
        else {
            data.save((error, result) => {
                console.log('fleet error', error);
                console.log('fleet result', result);
                if (error) {
                    console.log(error);
                    fleetResponse.error = true;
                    fleetResponse.message = `Error :` + " Something Went Wrong";
                    response.status(500).json(fleetResponse);
                } else {
                    fleetResponse.error = false;
                    fleetResponse.user = result;
                    fleetResponse.message = `Fleet Created   successfull.`;
                    response.status(200).json(fleetResponse);

                }

            });
        }


    })
})
/************************************END ******************************************** */
/******************************* DELETE BY ID *******************************/
router.delete('/delete',(request,response)=>{
    let fleetId=request.query.fleetId
    let sentResponse={}
    fleet.remove({_id:fleetId},(error,result)=>{
        console.log('error',error);
        console.log('result',result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Fleet Deleted";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/************************** Fleet LIST ********************************************** */
router.get('/list', (request, response) => {
    let sentResponse = {};
    fleet.find({}, (error, result) => {
        console.log('error',error);
        console.log('result',result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message;
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "ALL Contract List";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
module.exports = router;