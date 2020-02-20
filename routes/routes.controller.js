const express = require('express');
const router = express.Router();
const routes = require('./routes.model');
const user = require('../user/user.model');



/************************* VENDOR Creation *************************/
router.post('/create', (request, response) => {
    let routeResponse = {};
    let data = new routes({
        from_location: request.body.from_location,
        to_location: request.body.to_location,
        stopage: request.body.stopage?request.body.stopage:null,
        total_km: request.body.total_km,
        diesel_expenses: request.body.diesel_expenses,
        driver_expenses: request.body.driver_expenses,
        others_expenses: request.body.others_expenses?request.body.others_expenses:null,
        userId: request.body.userId,
    });
    console.log(data);
    user.findById({ _id: data.userId }, (error, result) => {
        console.log('result error', error);
        console.log('result result', result);
        if (error) {
            console.log(error);
            routeResponse.error = true;
            routeResponse.message = `Error :` + " User does not exist";
            response.status(500).json(routeResponse);
        }
        else {
                data.organisation = result.organisation
            if (result.role == 'superAdmin') {
                console.log('superAdmin')
                data.superAdminId = result._id
                data.save((error, result) => {
                    console.log('Routes error', error);
                    console.log('Routes result', result);
                    if (error) {
                        console.log(error);
                        routeResponse.error = true;
                        routeResponse.message = `Error :` + " creation failed";
                        response.status(500).json(routeResponse);
                    } else {

                        routeResponse.error = false;
                        routeResponse.result = result;
                        routeResponse.message = `Routes is created  successfull.`;
                        response.status(200).json(routeResponse);
                    }
                })
            }
            else {
                console.log('admin,other')
                data.superAdminId = result.superAdminId._id
                data.save((error, result) => {
                    console.log('Routes error', error);
                    console.log('Routes result', result);
                    if (error) {
                        console.log(error);
                        routeResponse.error = true;
                        routeResponse.message = `Error :` + " creation failed";
                        response.status(500).json(routeResponse);
                    } else {
                        routeResponse.error = false;
                        routeResponse.result = result;
                        routeResponse.message = `Routes is created  successfull.`;
                        response.status(200).json(routeResponse);
                    }
                })
            }
        }

    })
});
/************************** END ********************************************** */
/************************** routes DETAIL  ********************************************** */
router.get('/list', (request, response) => {
    let sentResponse = {};
    routes.find({}, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + "Something Went wrong";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Routes List";
            sentResponse.result = result;
            sentResponse.count = result.length;
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/******************************* DELETE BY ID *******************************/
router.delete('/delete', (request, response) => {
    let routeId = request.query.routeId
    let sentResponse = {}
    routes.remove({ _id: routeId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Routes not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Routes Deleted";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/************************** Routes DETAIL BY SUPERADMINID ********************************************** */
router.get('/routeslist', (request, response) => {
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
            routes.find({ superAdminId: superAdminId }, (error, result) => {
                console.log('routes', error);
                console.log('routes', result);
                if (error) {
                    sentResponse.error = true;
                    sentResponse.message = `Error :` + error.message + "Something went wrong";
                    response.status(500).json(sentResponse);
                }
                else {
                    sentResponse.error = false;
                    sentResponse.message = "Routes List";
                    sentResponse.result = result;
                    sentResponse.count = result.length;
                    response.status(200).json(sentResponse);

                }

            })
        }
    })
})

/************************************END ******************************************** */

module.exports = router;