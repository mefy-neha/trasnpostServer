
const express = require('express');
const router = express.Router();
const diesel = require('./diesel.model');
const petrol = require('./petrol.model');
const user = require('../user/user.model');
const moment = require('moment');

/************************************DIESEL CREATION ******************************************** */

router.post('/create', (request, response) => {
    let dieselResponse = {};
    let data = new diesel({

        pump_name: request.body.pump_name,    
        diesel: request.body.diesel, 
        notes: request.body.notes,
        date: request.body.date ? moment(request.body.date).format('YYYY-MM-DD') : null,
        driverId: request.body.driverId,
        truckId: request.body.truckId,
        userId: request.body.userId
    })
    console.log('dataaaa', data)
    user.findById({ _id: data.userId }, (error, result) => {
        console.log('result error', error);
        console.log('result result', result);
        if (error) {
            console.log(error);
            dieselResponse.error = true;
            dieselResponse.message = `Error :` + " User does not exist";
            response.status(500).json(dieselResponse);
        }
        else {
            if (result.role == 'superAdmin') {
                console.log('superAdmin')
                data.superAdminId = result._id
                data.save((error, result) => {
                    console.log('Destination error', error);
                    console.log('Destination result', result);
                    if (error || result == null) {
                        dieselResponse.error = true;
                        dieselResponse.message = `Error :` + "Creation failed";
                        response.status(500).json(dieselResponse);
                    } else {

                        dieselResponse.error = false;
                        dieselResponse.result = result;
                        dieselResponse.message = `Diesel Voucher is created  successfull.`;
                        response.status(200).json(dieselResponse);
                    }
                })
            }
            else {
                console.log('admin,other')
                data.superAdminId = result.superAdminId._id
                data.save((error, result) => {
                    console.log('Destination error', error);
                    console.log('Destination result', result);
                    if (error || result == null) {
                        dieselResponse.error = true;
                        dieselResponse.message = `Error :` + "Creation failed";
                        response.status(500).json(dieselResponse);
                    } else {

                        dieselResponse.error = false;
                        dieselResponse.result = result;
                        dieselResponse.message = `Diesel Voucher  is created  successfull.`;
                        response.status(200).json(dieselResponse);
                    }
                })
            }
        }

    })

})
/************************************END ******************************************** */
/************************************PETROL PRICE CREATION ******************************************** */

router.post('/petrolPrice', (request, response) => {
    let dieselResponse = {};
    let data = new petrol({
        user: request.body.user,    
        date:request.body.date,
        userId: request.body.userId
    })
    console.log('dataaaa', data)
    user.findById({ _id: data.userId }, (error, result) => {
        console.log('result error', error);
        console.log('result result', result);
        if (error) {
            console.log(error);
            dieselResponse.error = true;
            dieselResponse.message = `Error :` + " User does not exist";
            response.status(500).json(dieselResponse);
        }
        else {
            if (result.role == 'superAdmin') {
                console.log('superAdmin')
                data.superAdminId = result._id
                data.save((error, result) => {
                    console.log('Petrol error', error);
                    console.log('DePetrolstination result', result);
                    if (error || result == null) {
                        dieselResponse.error = true;
                        dieselResponse.message = `Error :` + "Creation failed";
                        response.status(500).json(dieselResponse);
                    } else {

                        dieselResponse.error = false;
                        dieselResponse.result = result;
                        dieselResponse.message = `Petrol price is created  successfull.`;
                        response.status(200).json(dieselResponse);
                    }
                })
            }
            else {
                console.log('admin,other')
                data.superAdminId = result.superAdminId._id
                data.save((error, result) => {
                    console.log('Petrol error', error);
                    console.log('Petrol result', result);
                    if (error || result == null) {
                        dieselResponse.error = true;
                        dieselResponse.message = `Error :` + "Creation failed";
                        response.status(500).json(dieselResponse);
                    } else {

                        dieselResponse.error = false;
                        dieselResponse.result = result;
                        dieselResponse.message = `Petrol price is created  successfull.`;
                        response.status(200).json(dieselResponse);
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
    diesel.find({}, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message;
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "ALL Diesel Voucher  List";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/************************** DIESEL DETAIL BY SUPERADMINID ********************************************** */
router.get('/dieselList', (request, response) => {
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
            diesel.find({ superAdminId: superAdminId }, (error, result) => {
                console.log('error', error);
                console.log('result', result);
                if (error) {
                    sentResponse.error = true;
                    sentResponse.message = `Error :` + error.message + "Something went wrong";
                    response.status(500).json(sentResponse);
                }
                else {
                    sentResponse.error = false;
                    sentResponse.message = "Diesel Voucher  List";
                    sentResponse.result = result
                    response.status(200).json(sentResponse);

                }

            })
        }
    })
})
/************************************END ******************************************** */
/******************************* DELETE DIESEL  BY ID *******************************/
router.delete('/delete', (request, response) => {
    let dieselId = request.query.dieselId
    let sentResponse = {}
    diesel.remove({ _id: dieselId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Diesel Deleted";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/******************************* DELETE PETROL BY ID *******************************/
router.delete('/removePrice', (request, response) => {
    let petrolId = request.query.petrolId
    let sentResponse = {}
    petrol.remove({ _id: petrolId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Petrol Deleted";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/************************************UPDATION OF PETROL PRICE ******************************************** */
router.put('/updatePrice', (request, response) => {
    let sentResponse = {};
    let petrolId = request.body.petrolId;
    petrol.findById({ _id: petrolId }, (error, result) => {
        console.log('error', error)
        console.log('result', result)
        if (error || result == null) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentResponse);
        }
        else if (result) {
                result.diesel_price = (request.body.diesel_price ? (request.body.diesel_price) : result.diesel_price);
                result.save((error, result) => {
                    if (error) {
                        sentResponse.error = true;
                        sentResponse.message = `Error :` + error.message + " Not update";
                        response.status(500).json(sentResponse);
                    }
                    else {
                        sentResponse.error = false;
                        sentResponse.message = "Price Updated";
                        sentResponse.result = result
                        response.status(200).json(sentResponse);

                    }
                })
            }
        
    })
})
/************************************END ******************************************** */
/************************** PETROL DETAIL BY SUPERADMINID ********************************************** */
router.get('/petrolList', (request, response) => {
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
            petrol.find({ superAdminId: superAdminId }, (error, result) => {
                console.log('error', error);
                console.log('result', result);
                if (error) {
                    sentResponse.error = true;
                    sentResponse.message = `Error :` + error.message + "Something went wrong";
                    response.status(500).json(sentResponse);
                }
                else {
                    sentResponse.error = false;
                    sentResponse.message = "Petrol price  List";
                    sentResponse.result = result
                    response.status(200).json(sentResponse);

                }

            })
        }
    })
})
/************************************END ******************************************** */
/************************************UPDATION OF PETROL PRICE ******************************************** */
router.put('/updateDiesel', (request, response) => {
    let sentResponse = {};
    let dieselId = request.body.dieselId;
    diesel.findById({ _id: dieselId }, (error, result) => {
        console.log('error', error)
        console.log('result', result)
        if (error || result == null) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentResponse);
        }
        else if (result) {
                result.actual_diesel = (request.body.actual_diesel ? (request.body.actual_diesel) : result.diesel_price);
                result.actual_date = (request.body.actual_date ? (request.body.actual_date) : result.actual_date);
                result.actual_amount = (request.body.actual_amount ? (request.body.actual_amount) : result.actual_amount);

                result.save((error, result) => {
                    if (error) {
                        sentResponse.error = true;
                        sentResponse.message = `Error :` + error.message + " Not update";
                        response.status(500).json(sentResponse);
                    }
                    else {
                        sentResponse.error = false;
                        sentResponse.message = "Diesel Updated";
                        sentResponse.result = result
                        response.status(200).json(sentResponse);

                    }
                })
            }
        
    })
})
/************************************END ******************************************** */
/*****************************PETROL LIST BY CURRENT DATE*************************** */
router.get('/currentPetrolList', (request, response) => {
    console.log('request ', request.query);   //userId,startDate,endDate
    let sentresponse = {};
    let superAdminId = request.query.superAdminId;
    let currentDate = moment().format('YYYY-MM-DD');
    petrol.find({ superAdminId: superAdminId}).populate('user.vendorId').exec((error, result) => { 
        // console.log(error);
        // console.log(result);
        if (error) {
            sentresponse.error = true;
            sentresponse.message = 'Error:' + error.message +'Does not exist';
            response.status(500).json(sentresponse);
        }
        else if (result && result.length != 0) {
            // find milage between dates
            listByCurrentDates(currentDate, result).then(petrollist => {
                sentresponse.error = false;
                sentresponse.result = petrollist;
                sentresponse.message = `Petrol list get succesfully .`;
                response.status(200).json(sentresponse);
            })
        }
        else {
            sentresponse.error = false;
            sentresponse.result = result;
            sentresponse.message = `Petrol  details getting  successfully .`;
            response.status(200).json(sentresponse);

        }
    })

})
/************************************END ******************************************** */

/****************************** COMAPRE IF INPUT DATE IS VETWEEN TWO DATES ******************* */
function listByCurrentDates(startDate, list) {
    let datearray = [];
    return new Promise((resolve, reject) => {
        list.forEach(element => {                  //filter list according to date comparison
            // console.log(moment(element.createdDate, "YYYY-MM-DD"))
            let dbdate = moment(element.createdDate, "YYYY-MM-DD");
            // console.log(moment(inputdate).isSame(dbdate,'date'))
            if (moment(startDate).isSame(dbdate, 'date')) {
                datearray.push(element);
            }
        })
        resolve(datearray)
    })
}
/************************************* ENDS ********************************************* */

module.exports = router;