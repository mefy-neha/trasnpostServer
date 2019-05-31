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
        rc:request.body.rc,
        capacity:request.body.capacity,
        vehicle_insurance:request.body.vehicle_insurance,
        product_insurance:request.body.product_insurance,
        explosive:request.body.explosive,
        calibration_chart:request.body.calibration_chart,
        national_permit:request.body.national_permit,
        national_permit_A:request.body.national_permit_A,
        national_permit_B:request.body.national_permit_B,
        road_tax:request.body.road_tax,
        pollution:request.body.pollution,
        sco:request.body.sco,
        abs:request.body.abs,
        hydro_testing:request.body.hydro_testing,
        fitness:request.body.fitness,
        others:request.body.others,

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
            if(result.role=='superAdmin'){
                console.log('role superadmin',result._id)
                data.superAdminId=result._id
                              
            data.save((error, result) => {
                console.log('fleet error', error);
                console.log('fleet result', result);
                if (error) {
                    console.log(error);
                    fleetResponse.error = true;
                    fleetResponse.message = `Error :` + " Something Went Wrong";
                    response.status(500).json(fleetResponse);
                }
               else {
                    fleetResponse.error = false;
                    fleetResponse.user = result;
                    fleetResponse.message = `Fleet Created   successfull.`;
                    response.status(200).json(fleetResponse);

                }

            });
        }
        else{
            console.log('role admin',)
            data.superAdminId=result.superAdminId._id
            data.save((error, result) => {
                console.log('fleet error', error);
                console.log('fleet result', result);
                if (error) {
                    console.log(error);
                    fleetResponse.error = true;
                    fleetResponse.message = `Error :` + " Something Went Wrong";
                    response.status(500).json(fleetResponse);
                }
               else {
                    fleetResponse.error = false;
                    fleetResponse.user = result;
                    fleetResponse.message = `Fleet Created   successfull.`;
                    response.status(200).json(fleetResponse);

                }

            }); 
        }
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
/************************** FLEET LIST ********************************************** */
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
/************************** FLEET DETAIL BY SUPERADMINID ********************************************** */
router.get('/fleetlist', (request, response) => {
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
            fleet.find({ superAdminId: superAdminId }, (error, result) => {
                console.log('error', error);
                console.log('result', result);
                if (error) {
                    sentResponse.error = true;
                    sentResponse.message = `Error :` + error.message + "Something went wrong";
                    response.status(500).json(sentResponse);
                }
                else {
                    sentResponse.error = false;
                    sentResponse.message = "Fleet List";
                    sentResponse.result = result
                    response.status(200).json(sentResponse);

                }

            })
        }
    })
})
/************************************END ******************************************** */
module.exports = router;