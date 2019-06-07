
const express = require('express');
const router = express.Router();
const order = require('./order.model');
const user = require('../user/user.model');

/************************************DESTINATION CREATION ******************************************** */

router.post('/create', (request, response) => {
    let orderResponse = {};
    let data = new order({
        tender_number: request.body.tender_number,
        induction_tt: request.body.induction_tt,
        rate_quoted: request.body.rate_quoted?request.body.rate_quoted:null,
        tts: request.body.tts?request.body.tts:null,
        terms_condition: request.body.terms_condition?request.body.terms_condition:null,
        spcl_condition: request.body.spcl_condition?request.body.spcl_condition:null,
        transport_guide: request.body.transport_guide?request.body.transport_guide:null,
        pbta: request.body.pbta?request.body.pbta:null,
        userId: request.body.userId
    })
    console.log('dataaaa', data)
    user.findById({ _id: data.userId }, (error, result) => {
        console.log('result error', error);
        console.log('result result', result);
        if (error) {
            console.log(error);
            orderResponse.error = true;
            orderResponse.message = `Error :` + " User does not exist";
            response.status(500).json(orderResponse);
        }
        else {
            if (result.role == 'superAdmin') {
                console.log('superAdmin')
                data.superAdminId = result._id
                data.save((error, result) => {
                    console.log('work_order error', error);
                    console.log('work_order result', result);
                    if (error || result == null) {
                        orderResponse.error = true;
                        orderResponse.message = `Error :` + "Creation failed";
                        response.status(500).json(orderResponse);
                    } else {

                        orderResponse.error = false;
                        orderResponse.result = result;
                        orderResponse.message = `Work Order is created  successfull.`;
                        response.status(200).json(orderResponse);
                    }
                })
            }
            else {
                console.log('admin,other')
                data.superAdminId = result.superAdminId._id
                data.save((error, result) => {
                    console.log('work_order error', error);
                    console.log('work_order result', result);
                    if (error || result == null) {
                        orderResponse.error = true;
                        orderResponse.message = `Error :` + "Creation failed";
                        response.status(500).json(orderResponse);
                    } else {

                        orderResponse.error = false;
                        orderResponse.result = result;
                        orderResponse.message = `Work Order is created  successfull.`;
                        response.status(200).json(orderResponse);
                    }
                })
            }
        }

    })

})
/************************************END ******************************************** */
/************************** DESTINATION LIST ********************************************** */
router.get('/list', (request, response) => {
    let sentResponse = {};
    order.find({}, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message;
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "ALL Order List";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/************************** DESTINATION DETAIL BY SUPERADMINID ********************************************** */
router.get('/orderList', (request, response) => {
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
            order.find({ superAdminId: superAdminId }, (error, result) => {
                console.log('error', error);
                console.log('result', result);
                if (error) {
                    sentResponse.error = true;
                    sentResponse.message = `Error :` + error.message + "Something went wrong";
                    response.status(500).json(sentResponse);
                }
                else {
                    sentResponse.error = false;
                    sentResponse.message = "Order List";
                    sentResponse.result = result
                    response.status(200).json(sentResponse);

                }

            })
        }
    })
})
/************************************END ******************************************** */
/******************************* DELETE BY ID *******************************/
router.delete('/delete', (request, response) => {
    let orderId = request.query.orderId
    let sentResponse = {}
    order.remove({ _id: orderId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Order Deleted";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */

module.exports = router;