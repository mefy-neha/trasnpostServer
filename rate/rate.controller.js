const express = require('express');
const router = express.Router();
const rate = require('./rate.model');
const user = require('../user/user.model');
const moment = require('moment');

/************************************BANK CREATION ******************************************** */
router.post('/create', (request, response) => {
    let rateResponse = {};
    let data = new rate({
        customerId: request.body.customerId,
        from_km: request.body.from_km,
        to_km: request.body.to_km,
        rate: request.body.rate,
        within_state: request.body.within_state,
        unit:request.body.unit,
        truck_confg:request.body.truck_confg,
        effactive_date_from:request.body.effactive_date_from,
        effactive_date_to:request.body.effactive_date_to,
        userId: request.body.userId
    })
    console.log('dataaaa', data)
    user.findById({ _id: data.userId }, (error, result) => {
        console.log('result error', error);
        console.log('result result', result);
        if (error) {
            console.log(error);
            rateResponse.error = true;
            rateResponse.message = `Error :` + " User does not exist";
            response.status(500).json(rateResponse);
        }
        else {
            if (result.role == 'superAdmin') {
                console.log('superAdmin')
                data.superAdminId = result._id
                data.save((error, result) => {
                    console.log('rate error', error);
                    console.log('rate result', result);
                    if (error) {
                        console.log(error);
                        rateResponse.error = true;
                        rateResponse.message = `Error :` + " creation failed";
                        response.status(500).json(rateResponse);
                    } else {

                        rateResponse.error = false;
                        rateResponse.result = result;
                        rateResponse.message = `Rate is created  successfull.`;
                        response.status(200).json(rateResponse);
                    }
                })
            }
            else {
                console.log('admin,other')
                data.superAdminId = result.superAdminId._id
                data.save((error, result) => {
                    console.log('rate error', error);
                    console.log('rate result', result);
                    if (error) {
                        console.log(error);
                        rateResponse.error = true;
                        rateResponse.message = `Error :` + " creation failed";
                        response.status(500).json(rateResponse);
                    } else {
                        rateResponse.error = false;
                        rateResponse.result = result;
                        rateResponse.message = `Rate is created  successfull.`;
                        response.status(200).json(rateResponse);
                    }
                })
            }
        }

    })

})

/************************************END ******************************************** */
/************************** RATE LIST ********************************************** */
router.get('/list', (request, response) => {
    let sentResponse = {};
    rate.find({}, (error, result) => {
        console.log(' customer list error', error);
        console.log('customer list result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message;
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "ALL Customer  List";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/************************** RATE LIST BY SUPERADMIN  ********************************************** */
router.get('/rateList', (request, response) => {
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
            rate.find({ superAdminId: superAdminId },(error,result)=> { 
                console.log('error', error);
                console.log('result', result);
                if (error) {
                    sentResponse.error = true;
                    sentResponse.message = `Error :` + error.message + "Something went wrong";
                    response.status(500).json(sentResponse);
                }
                else {
                    sentResponse.error = false;
                    sentResponse.message = "Rate List";
                    sentResponse.result = result
                    response.status(200).json(sentResponse);

                }

            })
        }
    })
})
/************************************END ******************************************** */
/******************************* CUSTOMER  BY ID *******************************/
router.get('/rateById', (request, response) => {
    let rateId = request.query.rateId
    let sentResponse = {}
    rate.findById({ _id: rateId }, (error, result) => {
        console.log('rate get error', error);
        console.log('raete get result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Rate Detail";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/******************************* DELETE BY ID *******************************/
router.delete('/delete',(request,response)=>{
    let rateId=request.query.rateId
    let sentResponse={}
    rate.remove({_id:rateId},(error,result)=>{
        console.log('error',error);
        console.log('result',result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "rate Deleted";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
module.exports = router;
