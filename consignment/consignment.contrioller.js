const express = require('express');
const router = express.Router();
const consignment = require('./consignment.model');
const user = require('../user/user.model');
const moment = require('moment');

/************************************BANK CREATION ******************************************** */
router.post('/create', (request, response) => {
    let consignmentResponse = {};
    let data = new consignment({
        // tl_number: request.body.tl_number,
        consignment: request.body.consignment,
        // location_number: request.body.location_number,
        consignor: request.body.consignor,
        consignee: request.body.consignee,
        consignment_date: request.body.consignment_date ? moment(request.body.consignment_date).format('YYYY-MM-DD') : null,
        reference_number: request.body.reference_number,
        truck_number: request.body.truck_number,
        origin_place: request.body.origin_place,
        destination: request.body.destination,
        authorize_person: request.body.authorize_person,
        driver_license_number: request.body.driver_license_number,
        driver_name: request.body.driver_name,
        advance_payment: request.body.advance_payment,
        price_type:request.body.price_type,
        userId: request.body.userId
    })
    console.log('dataaaa', data)
    user.findById({ _id: data.userId }, (error, result) => {
        console.log('result error', error);
        console.log('result result', result);
        if (error) {
            console.log(error);
            consignmentResponse.error = true;
            consignmentResponse.message = `Error :` + " User does not exist";
            response.status(500).json(consignmentResponse);
        }
        else {
            // data.organisation = result.organisation
            if (result.role == 'superAdmin') {
                console.log('superAdmin')
                data.superAdminId = result._id
                consignment.find({ superAdminId: data.superAdminId }, (error, list) => {
                    console.log('error', error);
                    console.log(' consignment length', list.length)
                    if (error) {
                        journalResponse.error = true;
                        journalResponse.message = `Error :` + error.message + 'Organisation does not exist';
                        response.status(500).json(journalResponse);
                    }
                    else {
                        let y = {}
                        y = list.length + 1
                        console.log('y number///',y)
                        data.consignmentNumber = 'CON-00' + y
                        console.log('consignmentNumber////',data.consignmentNumber)
                        data.save((error, result) => {
                            console.log('Consignment error', error);
                            console.log('Consignment result', result);
                            if (error) {
                                console.log(error);
                                consignmentResponse.error = true;
                                consignmentResponse.message = `Error :` + " creation failed";
                                response.status(500).json(consignmentResponse);
                            } else {

                                consignmentResponse.error = false;
                                consignmentResponse.result = result;
                                consignmentResponse.message = `Consignment is created  successfull.`;
                                response.status(200).json(consignmentResponse);
                            }
                        })
                    }
                })
            }
            else {
                console.log('admin,other')
                data.superAdminId = result.superAdminId._id
                consignment.find({ superAdminId:data.superAdminId }, (error, list) => {
                    console.log('error', error);
                    console.log(' consignment length', list.length)
                    if (error) {
                        journalResponse.error = true;
                        journalResponse.message = `Error :` + error.message + 'Organisation does not exist';
                        response.status(500).json(journalResponse);
                    }
                    else {
                        let z = {}
                        z= list.length + 1
                        console.log('y number///',z)
                        data.consignmentNumber = 'CON-00' + z
                        console.log('consignmentNumber////',data.consignmentNumber)
                        data.save((error, result) => {
                            console.log('Consignment error', error);
                            console.log('Consignment result', result);
                            if (error) {
                                console.log(error);
                                consignmentResponse.error = true;
                                consignmentResponse.message = `Error :` + " creation failed";
                                response.status(500).json(consignmentResponse);
                            } else {
                                consignmentResponse.error = false;
                                consignmentResponse.result = result;
                                consignmentResponse.message = `Consignment is created  successfull.`;
                                response.status(200).json(consignmentResponse);
                            }
                        })
                    }
                })
            }
        }

    })

})

/************************************END ******************************************** */
/************************** BANK LIST ********************************************** */
router.get('/list', (request, response) => {
    let sentResponse = {};
    consignment.find({}, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message;
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "ALL Consignment List";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/************************** BANK DETAIL BY SUPERADMINID ********************************************** */
router.get('/consignmentList', (request, response) => {
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
            consignment.find({ superAdminId: superAdminId }, (error, result) => {
                console.log('error', error);
                console.log('result', result);
                if (error) {
                    sentResponse.error = true;
                    sentResponse.message = `Error :` + error.message + "Something went wrong";
                    response.status(500).json(sentResponse);
                }
                else {
                    sentResponse.error = false;
                    sentResponse.message = "Consignment List";
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
    let consignmentId = request.query.consignmentId
    let sentResponse = {}
    consignment.remove({ _id: consignmentId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Consignment Deleted";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/******************************* CONSIGNMENT BY ID *******************************/
router.get('/consignmentById', (request, response) => {
    let consignmentId = request.query.consignmentId
    let sentResponse = {}
    consignment.findById({ _id: consignmentId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Consignment Detail";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/*****************  COSIGNMENT HISTORY ACCORDING TO USERID AND BETWEEN TWO DATES ************ */
router.get('/consignmentBetweenDate', (request, response) => {
    console.log('request ', request.query);   //userId,startDate,endDate
    let sentresponse = {};
    let superAdminId = request.query.superAdminId;
    let to = moment().format('YYYY-MM-DD');
    // console.log('currentDate', to);
    let from = moment(request.query.from, 'YYYY-MM-DD');
    console.log('dates',from,to)
    consignment.find({ superAdminId: superAdminId }, (error, result) => {
        console.log('error...', error);
        // console.log(result);
        if (error) {
            sentresponse.error = true;
            sentresponse.message = 'Error:' + error.message +'Does not exist';
            response.status(500).json(sentresponse);
        }
        else if (result && result.length != 0) {
            // find consignment between dates
            consignmentBetweenDates(from, to, result).then(list => {
             
                sentresponse.error = false;
                sentresponse.result = list;           
                sentresponse.message = `Consignment  list get succesfully .`;
                response.status(200).json(sentresponse);
            })
        }
        else {
            sentresponse.error = false;
            sentresponse.result = result;
            sentresponse.message = `Consignment getting  successfully .`;
            response.status(200).json(sentresponse);

        }
    })

})

/****************************************** ENDS ***************************************** */

/****************************** COMAPRE IF INPUT DATE IS VETWEEN TWO DATES ******************* */
function consignmentBetweenDates(startDate, endDate, list) {
    let datearray = [];
    return new Promise((resolve, reject) => {
        list.forEach(element => {                  //filter list according to date comparison
            // console.log(moment(element.createdDate, "YYYY-MM-DD"))
            let dbdate = moment(element.createdDate, "YYYY-MM-DD");
            // console.log(moment(inputdate).isSame(dbdate,'date'))
            if (moment(startDate).isSame(endDate, 'date')) {
                if (moment(startDate).isSame(dbdate, 'date')) {
                    datearray.push(element);
                }
            }
            else {
                if (moment(dbdate).isBetween(startDate, endDate, null, '[]')) {
                    console.log('date matched')
                    datearray.push(element);
                    // console.log(montharray)
                }
            }

        })
        resolve(datearray)
    })
}
/************************************* ENDS ********************************************* */
module.exports = router;