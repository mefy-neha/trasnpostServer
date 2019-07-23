const express = require('express');
const router = express.Router();
const fleet = require('./fleet.model');
const user = require('../user/user.model');
const moment = require('moment');


/*************************FLEET CREATION *************************/
router.post('/create', (request, response) => {
    let fleetResponse = {};
    console.log('request', request.body)
    let data = new fleet({
        truck_number: request.body.truck_number,
        userId: request.body.userId,
        capacity: request.body.capacity,
        ownId: request.body.ownId ? request.body.ownId : null,
        contractId: request.body.contractId ? request.body.contractId : null,

    });
    console.log(data);
    if (request.body.rc != null) {
        data.rc = {
            doc: request.body.rc.doc,
            number: request.body.rc.number,
            valid_upto: request.body.rc.valid_upto ? moment(request.body.rc.valid_upto).format('YYYY-MM-DD') : null
        }
        console.log('gst', data.rc)
    }
    if (request.body.vehicle_insurancec != null) {
        data.vehicle_insurance = {
            doc: request.body.vehicle_insurance.doc,
            number: request.body.vehicle_insurance.number,
            valid_upto: request.body.vehicle_insurance.valid_upto ? moment(request.body.vehicle_insurance.valid_upto).format('YYYY-MM-DD') : null
        }
        console.log('gst', data.vehicle_insurance)
    }
    if (request.body.product_insurance != null) {
        data.product_insurance = {
            doc: request.body.product_insurance.doc,
            number: request.body.product_insurance.number,
            valid_upto: request.body.product_insurance.valid_upto ? moment(request.body.product_insurance.valid_upto).format('YYYY-MM-DD') : null
        }
        console.log('gst', data.product_insurance)
    }
    if (request.body.explosive != null) {
        data.explosive = {
            doc: request.body.explosive.doc,
            number: request.body.explosive.number,
            valid_upto: request.body.explosive.valid_upto ? moment(request.body.explosive.valid_upto).format('YYYY-MM-DD') : null
        }
        console.log('gst', data.explosive)
    }
    if (request.body.calibration_chart != null) {
        data.calibration_chart = {
            doc: request.body.calibration_chart.doc,
            number: request.body.calibration_chart.number,
            valid_upto: request.body.calibration_chart.valid_upto ? moment(request.body.calibration_chart.valid_upto).format('YYYY-MM-DD') : null
        }
        console.log('gst', data.calibration_chart)
    }
    if (request.body.national_permit != null) {
        data.national_permit = {
            doc: request.body.national_permit.doc,
            number: request.body.national_permit.number,
            valid_upto: request.body.national_permit.valid_upto ? moment(request.body.national_permit.valid_upto).format('YYYY-MM-DD') : null
        }
        console.log('gst', data.national_permit)
    }
    if (request.body.national_permit_A != null) {
        data.national_permit_A = {
            doc: request.body.national_permit_A.doc,
            number: request.body.national_permit_A.number,
            valid_upto: request.body.national_permit_A.valid_upto ? moment(request.body.national_permit_A.valid_upto).format('YYYY-MM-DD') : null
        }
        console.log('gst', data.national_permit_A)
    }
    if (request.body.national_permit_B != null) {
        data.national_permit_B = {
            doc: request.body.national_permit_B.doc,
            number: request.body.national_permit_B.number,
            valid_upto: request.body.national_permit_B.valid_upto ? moment(request.body.national_permit_B.valid_upto).format('YYYY-MM-DD') : null
        }
        console.log('gst', data.national_permit_B)
    }
    if (request.body.road_tax != null) {
        data.road_tax = {
            doc: request.body.road_tax.doc,
            number: request.body.road_tax.number,
            valid_upto: request.body.road_tax.valid_upto ? moment(request.body.road_tax.valid_upto).format('YYYY-MM-DD') : null
        }
        console.log('gst', data.road_tax)
    }
    if (request.body.pollution != null) {
        data.pollution = {
            doc: request.body.pollution.doc,
            number: request.body.pollution.number,
            valid_upto: request.body.pollution.valid_upto ? moment(request.body.pollution.valid_upto).format('YYYY-MM-DD') : null
        }
        console.log('gst', data.pollution)
    }
    if (request.body.sco != null) {
        data.sco = {
            doc: request.body.sco.doc,
            number: request.body.sco.number,
            valid_upto: request.body.sco.valid_upto ? moment(request.body.sco.valid_upto).format('YYYY-MM-DD') : null
        }
        console.log('gst', data.sco)
    }
    if (request.body.hydro_testing != null) {
        data.hydro_testing = {
            doc: request.body.hydro_testing.doc,
            number: request.body.hydro_testing.number,
            valid_upto: request.body.hydro_testing.valid_upto ? moment(request.body.hydro_testing.valid_upto).format('YYYY-MM-DD') : null
        }
        console.log('gst', data.hydro_testing)
    }
    if (request.body.fitness != null) {
        data.fitness = {
            doc: request.body.fitness.doc,
            number: request.body.fitness.number,
            valid_upto: request.body.fitness.valid_upto ? moment(request.body.fitness.valid_upto).format('YYYY-MM-DD') : null
        }
        console.log('gst', data.fitness)
    }
    let new_others = []
    if (request.body.others != null) {
        for (let i = 0; i < request.body.others.length; i++) {
            var comingDate = request.body.others[i].valid_upto ? moment(request.body.others[i].valid_upto).format('YYYY-MM-DD') : null;
            console.log(comingDate)
            new_others.push({ valid_upto: comingDate, doc: request.body.others[i].doc ? request.body.others[i].doc : null, doc_name: request.body.others[i].doc_name ? request.body.others[i].doc_name : null, number: request.body.others[i].number ? request.body.others[i].number : null })
        }
        console.log('new_others', new_others)
        data.others = new_others
    }
    user.findById({ _id: data.userId }, (error, result) => {
        console.log('user error', error);
        console.log('user result', result);
        if (error || result == null) {
            fleetResponse.error = true;
            fleetResponse.message = `Error :` + " User Does not exist";
            response.status(500).json(fleetResponse);
        }
        else {
            if (result.role == 'superAdmin') {
                console.log('role superadmin', result._id)
                data.superAdminId = result._id

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
            else {
                console.log('role admin')
                data.superAdminId = result.superAdminId._id
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
router.delete('/delete', (request, response) => {
    let fleetId = request.query.fleetId
    let sentResponse = {}
    fleet.remove({ _id: fleetId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
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
        console.log('error', error);
        console.log('result', result);
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
/******************************* FLEET BY ID *******************************/
router.get('/fleetById', (request, response) => {
    let fleetId = request.query.fleetId
    let sentResponse = {}
    fleet.findById({ _id: fleetId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Fleet Detail";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/************************************ FLEET UPDATE ******************************************** */
router.put('/update', (request, response) => {
    let sentResponse = {};
    let fleetId = request.body.fleetId;
    fleet.findById({ _id: fleetId }, (error, result) => {
        console.log('error', error)
        console.log('result', result)
        if (error || result == null) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentResponse);
        }
        else if (result) {
            if (request.body.rc != null) {
                result.rc = {
                    doc: request.body.rc.doc ? (request.body.rc.doc) : result.rc.doc,
                    number: request.body.rc.number ? (request.body.rc.number) : result.rc.number,
                    valid_upto: request.body.rc.valid_upto ? moment(request.body.rc.valid_upto).format('YYYY-MM-DD') : result.rc.valid_upto
                }
            }
            if (request.body.vehicle_insurancec != null) {
                result.vehicle_insurancec = {
                    doc: request.body.vehicle_insurancec.doc ? (request.body.vehicle_insurancec.doc) : result.vehicle_insurancec.doc,
                    number: request.body.vehicle_insurancec.number ? (request.body.vehicle_insurancec.number) : result.vehicle_insurancec.number,
                    valid_upto: request.body.vehicle_insurancec.valid_upto ? moment(request.body.vehicle_insurancec.valid_upto).format('YYYY-MM-DD') : result.vehicle_insurancec.valid_upto
                }
            }
            if (request.body.product_insurance != null) {
                result.product_insurance = {
                    doc: request.body.product_insurance.doc ? (request.body.product_insurance.doc) : result.product_insurance.doc,
                    number: request.body.product_insurance.number ? (request.body.product_insurance.number) : result.product_insurance.number,
                    valid_upto: request.body.product_insurance.valid_upto ? moment(request.body.product_insurance.valid_upto).format('YYYY-MM-DD') : result.product_insurance.valid_upto
                }
            }
            if (request.body.explosive != null) {
                result.explosive = {
                    doc: request.body.explosive.doc ? (request.body.explosive.doc) : result.explosive.doc,
                    number: request.body.explosive.number ? (request.body.explosive.number) : result.explosive.number,
                    valid_upto: request.body.explosive.valid_upto ? moment(request.body.explosive.valid_upto).format('YYYY-MM-DD') : result.explosive.valid_upto
                }
            }
            if (request.body.calibration_chart != null) {
                result.calibration_chart = {
                    doc: request.body.calibration_chart.doc ? (request.body.calibration_chart.doc) : result.calibration_chart.doc,
                    number: request.body.calibration_chart.number ? (request.body.calibration_chart.number) : result.calibration_chart.number,
                    valid_upto: request.body.calibration_chart.valid_upto ? moment(request.body.calibration_chart.valid_upto).format('YYYY-MM-DD') : result.calibration_chart.valid_upto
                }
            }
            if (request.body.national_permit != null) {
                result.national_permit = {
                    doc: request.body.national_permit.doc ? (request.body.national_permit.doc) : result.national_permit.doc,
                    number: request.body.national_permit.number ? (request.body.national_permit.number) : result.national_permit.number,
                    valid_upto: request.body.national_permit.valid_upto ? moment(request.body.national_permit.valid_upto).format('YYYY-MM-DD') : result.national_permit.valid_upto
                }
            }
            if (request.body.national_permit_A != null) {
                result.national_permit_A = {
                    doc: request.body.national_permit_A.doc ? (request.body.national_permit_A.doc) : result.national_permit_A.doc,
                    number: request.body.national_permit_A.number ? (request.body.national_permit_A.number) : result.national_permit_A.number,
                    valid_upto: request.body.national_permit_A.valid_upto ? moment(request.body.national_permit_A.valid_upto).format('YYYY-MM-DD') : result.national_permit_A.valid_upto
                }
            }
            if (request.body.national_permit_B != null) {
                result.national_permit_B = {
                    doc: request.body.national_permit_B.doc ? (request.body.national_permit_B.doc) : result.national_permit_B.doc,
                    number: request.body.national_permit_B.number ? (request.body.national_permit_B.number) : result.national_permit_B.number,
                    valid_upto: request.body.national_permit_B.valid_upto ? moment(request.body.national_permit_B.valid_upto).format('YYYY-MM-DD') : result.national_permit_B.valid_upto
                }
            }
            if (request.body.road_tax != null) {
                result.road_tax = {
                    doc: request.body.road_tax.doc ? (request.body.road_tax.doc) : result.road_tax.doc,
                    number: request.body.road_tax.number ? (request.body.road_tax.number) : result.road_tax.number,
                    valid_upto: request.body.road_tax.valid_upto ? moment(request.body.road_tax.valid_upto).format('YYYY-MM-DD') : result.road_tax.valid_upto
                }
            }
            if (request.body.pollution != null) {
                result.pollution = {
                    doc: request.body.pollution.doc ? (request.body.pollution.doc) : result.pollution.doc,
                    number: request.body.pollution.number ? (request.body.pollution.number) : result.pollution.number,
                    valid_upto: request.body.pollution.valid_upto ? moment(request.body.pollution.valid_upto).format('YYYY-MM-DD') : result.pollution.valid_upto
                }
            }
            if (request.body.hydro_testing != null) {
                result.hydro_testing = {
                    doc: request.body.hydro_testing.doc ? (request.body.hydro_testing.doc) : result.hydro_testing.doc,
                    number: request.body.hydro_testing.number ? (request.body.hydro_testing.number) : result.hydro_testing.number,
                    valid_upto: request.body.hydro_testing.valid_upto ? moment(request.body.hydro_testing.valid_upto).format('YYYY-MM-DD') : result.hydro_testing.valid_upto
                }
            }
            if (request.body.fitness != null) {
                result.fitness = {
                    doc: request.body.fitness.doc ? (request.body.fitness.doc) : result.fitness.doc,
                    number: request.body.fitness.number ? (request.body.fitness.number) : result.fitness.number,
                    valid_upto: request.body.fitness.valid_upto ? moment(request.body.fitness.valid_upto).format('YYYY-MM-DD') : result.fitness.valid_upto
                }
            }
            if (request.body.sco != null) {
                result.sco = {
                    doc: request.body.sco.doc ? (request.body.sco.doc) : result.sco.doc,
                    number: request.body.sco.number ? (request.body.sco.number) : result.sco.number,
                    valid_upto: request.body.sco.valid_upto ? moment(request.body.sco.valid_upto).format('YYYY-MM-DD') : result.sco.valid_upto
                }
            }
            if (request.body.others != null) {
                let update_others=[];
                        for(let i =0;i < request.body.others.length; i++){
                            var comingDate = moment(request.body.others[i].valid_upto).format('YYYY-MM-DD');
                            console.log(comingDate)
                            update_others.push({name:request.body.others[i].name,doc:request.body.others[i].doc,number:request.body.others[i].number,valid_upto:comingDate})
                       }
                       console.log('update_others',update_others)
                result.others = (request.body.others ? (update_others) : result.others);
                     
                }
            result.save((error, result) => {
                console.log(' save error', error)
                if (error) {
                    sentResponse.error = true;
                    sentResponse.message = `Error :` + error.message + " Not update";
                    response.status(500).json(sentResponse);
                }
                else {
                    sentResponse.error = false;
                    sentResponse.message = "Fleet Updated";
                    sentResponse.result = result
                    response.status(200).json(sentResponse);

                }
            })

        }


    })
})
/************************************END ******************************************** */
/*****************  BILL HISTORY ACCORDING TO USERID AND BETWEEN TWO DATES ************ */
router.get('/fleetBetweenDate', (request, response) => {
    console.log('request ', request.query);   //userId,startDate,endDate
    let sentresponse = {};
    let superAdminId = request.query.superAdminId;
    let from = moment().format('YYYY-MM-DD');
    // console.log('currentDate', from);
    let to = moment(request.query.to, 'YYYY-MM--DD');
    console.log('dates',from,to)
    let newFleetData = {};

   
    let x=[]
    fleet.find({ superAdminId: superAdminId }, (error, result) => {
        console.log('error...', error);
        // console.log('reult userr',result);
        if (error) {
            sentresponse.error = true;
            sentresponse.message = 'Error:' + error.message +'Does not exist';
            response.status(500).json(sentresponse);
        }
        
        else if (result && result.length != 0) {

            for( let i =0;i<result.length;i++){
            // console.log('valid_upto',result[i].rc.valid_upto)     
            
                // console.log(moment(result[i].rc.valid_upto).isBetween(from, to,null, '[]'))
//                   if (moment(result[i].rc.valid_upto).isBetween(from, to,null, '[]')){
                   

          

//                     console.log('valid_uptokkk', newFleetData.fleetId)     
              
// x.push(newFleetData)
// console.log('newFleetData',x)
//             }
 
            }
            // console.log(newFleetData)
           
            // console.log('newFleetData',newFleetData)
       
            // billBetweenDates(from, to, result).then(billlist => {
             
                sentresponse.error = false;
                sentresponse.result = x; 
                sentresponse.message = `Fleet  list get succesfully .`;
                response.status(200).json(sentresponse);
            // })
        }
        else {
            sentresponse.error = false;
            sentresponse.result = result;
            sentresponse.message = `Fleet getting  successfully .`;
            response.status(200).json(sentresponse);

        }
    })

})

/****************************************** ENDS ***************************************** */

/****************************** COMAPRE IF INPUT DATE IS VETWEEN TWO DATES ******************* */
function billBetweenDates(startDate, endDate, list) {
    let datearray = [];
    return new Promise((resolve, reject) => {
        list.forEach(element => {                  //filter list according to date comparison
            // console.log(moment(element.createdDate, "YYYY-MM-DD"))
            let dbdate = moment(element.valid_upto, "YYYY-MM-DD");
            // console.log(moment(inputdate).isSame(dbdate,'date'))      
                if (moment(dbdate).isBetween(startDate, endDate, null, '[]')) {
                    console.log('date matched')
                    datearray.push(element);
                    // console.log(montharray)
                }
            

        })
        resolve(datearray)
    })
}
/************************************* ENDS ********************************************* */
module.exports = router;
 // vehicle_insurance:request.body.vehicle_insurance,
        // product_insurance:request.body.product_insurance,
        // explosive:request.body.explosive,
        // calibration_chart:request.body.calibration_chart,
        // national_permit:request.body.national_permit,
        // national_permit_A:request.body.national_permit_A,
        // national_permit_B:request.body.national_permit_B,
        // road_tax:request.body.road_tax,
        // pollution:request.body.pollution,
        // sco:request.body.sco,
        // abs:request.body.abs,
        // hydro_testing:request.body.hydro_testing,
        // fitness:request.body.fitness,
        // others:request.body.others,
        // rc:request.body.rc,
        // for (var key in result[i]){
        //     newFleetData[key] = result[i][key];
        //     delete newFleetData[key];
        //     newFleetData.fleetId=result[i]._id;
        //     newFleetData.rc=result[i].rc;
        //     newFleetData.truck_number=result[i].truck_number; 
        // }