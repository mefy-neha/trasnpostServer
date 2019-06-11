const express = require('express');
const router = express.Router();
const tender = require('./tender.model');
const user = require('../user/user.model');
const company = require('../company/company.model');
const fleet = require('../fleet/fleet.model');


/************************************TENDER ******************************************** */
router.post('/tender', (request, response) => {
    let superAdminId = request.query.superAdminId;
    console.log('superAdmin')
    let fleetArray = request.body.fleetArray
    console.log('fleetArray', fleetArray)
    let companyData = request.body.companyData
    console.log('companydata', companyData)

    let y = []
    let sentResponse = {};
    let x = []
    company.findOne({ superAdminId: superAdminId }, (error, result) => {
        // console.log('error', error);
        // console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + "User Does not exist";
            response.status(500).json(sentResponse);
        }
        else if (result) {
            // console.log("result>>>>>>>>>>>>" + result)       
            if (companyData.gst === 'gst') {
                console.log("gst")
                x.push({ gst: result.gst })
            }
            if (companyData.road_registration_certificate == 'road_registration_certificate') {
                console.log("road_registration_certificate")
                x.push({ road_registration_certificate: result.road_registration_certificate })
            }
            if (companyData.tradeLicense_A == 'tradeLicense_A') {
                console.log("tradeLicense_A")
                x.push({ tradeLicense_A: result.tradeLicense_A })

            }
            if (companyData.tradeLicense_B == 'tradeLicense_B') {
                console.log("tradeLicense_B")
                x.push({ tradeLicense_B: result.tradeLicense_B })

            }
            if (companyData.invoice == 'invoice') {
                console.log("invoice")
                x.push({ invoice: result.invoice })

            }
            if (companyData.pan == 'pan') {
                console.log("pan")
                x.push({ pan: result.pan })

            }
            if (companyData.tan == 'tan') {
                console.log("tan")
                x.push({ tan: result.tan })

            }
            if (companyData.pf == 'pf') {
                console.log("pf")
                x.push({ pf: result.pf })

            }
            if (companyData.professional_tax == 'professional_tax') {
                console.log("professional_tax")
                x.push({ professional_tax: result.professional_tax })

            }
            if (companyData.esi == 'esi') {
                console.log("esi")
                x.push({ esi: result.esi })

            }
            if (companyData.itr == 'itr') {
                console.log("itr")
                x.push({ itr: result.itr })

            }
            if (companyData.balance_sheet == 'balance_sheet') {
                console.log("balance_sheet")
                x.push({ balance_sheet: result.balance_sheet })

            }
            if (fleetArray != null && fleetArray.length != 0) {
                console.log("fleet>>>>>>>>>>>>>>>>>>>>")
                fleetsData(fleetArray).then(list => {
                    console.log(list)
                }).catch(error => {
                    console.log(error)
                })
                // for (let i = 0; i < fleetArray.length; i++) {

                //     console.log(fleetArray.length)

                //     // console.log('fleetArray[i].fleetId', fleetArray[i].fleetId)
                //     fleet.findOne({ _id: fleetArray[i].fleetId}, (error, result) => {
                //         console.log("error>>>>>>>>>>>" + error)
                //         console.log("result??????????yipeeeee" + result)
                //         if (error ) {
                //             // console.log("inside error***********")
                //             sentResponse.error = true;
                //             sentResponse.message = `Error :` + error.message + "Fleet Does not exist";
                //             response.status(500).json(sentResponse);
                //         }
                //         else if(result){
                //             console.log("inside result***********")
                //             // console.log('result fleet',result[i])
                //             if(fleetArray[i].truck_number=='truck_number'||fleetArray[i].rc=='rc'||fleetArray[i].fitness=='fitness'||fleetArray[i].hydro_testing=='hydro_testing'){
                //                 // console.log('truck_number',fleetArray[i].truck_number)
                //                 // console.log('truck_number result',result.truck_number)
                //                 y.push({truck_number:result.truck_number,rc:result.rc,fitness:result.fitness,userId:result.userId,ownership:result.ownership,fleetId:result._id})
                //                 console.log('yyyyy inside',y)

                //             } 
                //             else{

                //                 console.log("nhi if >>>>>>>>>>>>>>>>>>>>>>>>>>>>")
                //             } 

                //         } 


                //     })
                // }
            }
            console.log('****** OUTSIDE *******', y)
            sentResponse.error = false;
            sentResponse.message = "Tender Document";
            sentResponse.result1 = x
            // sentResponse.result2 = y

            response.status(200).json(sentResponse);


        }
        else {
            sentResponse.error = true;
            sentResponse.message = 'Error::' + "Id doesn't exists";
            response.status(404).json(sentResponse);
        }

    })
})


async function fleetsData(fleet){
let fleetdata=[];
    for (const subs of fleet) {
        // console.log('substitute data',subs)
        await Promise.all([populatefields(subs)]).then(function (values) {
            console.log('RETUNED VALUESSSS', values);
            fleetdata.push(values[0]);

            // var data = subs.toObject();
            // data.product = values[0];

            // x.push(data)

        })
    }
    return fleetdata;
}


async function populatefields(fleet) {
    return new Promise(function (resolve, reject) {
        fleet.findOne({ _id: fleet.fleetId}, (error, result) => {
                    console.log("error>>>>>>>>>>>" + error)
                    console.log("result??????????yipeeeee" + result)
                    if (error ) {
            //             // console.log("inside error***********")
            //             sentResponse.error = true;
            //             sentResponse.message = `Error :` + error.message + "Fleet Does not exist";
            //             response.status(500).json(sentResponse);
                    }
                    else if(result){
                        resolve(result)
                    }
        })
        })
}
/************************************END ******************************************** */
module.exports = router;
   // if (companyData.gst === 'gst'||companyData.balance_sheet == 'balance_sheet'||companyData.itr == 'itr'||companyData.esi == 'esi'||companyData.professional_tax == 'professional_tax' ||companyData.pf == 'pf'||companyData.road_registration_certificate == 'road_registration_certificate'||companyData.tradeLicense_A == 'tradeLicense_A'||companyData.tradeLicense_B == 'tradeLicense_B'||companyData.invoice == 'invoice'||companyData.pan == 'pan'||companyData.tan == 'tan') {
    //     console.log("gst",companyData.gst )
    //     x.push({ gst: result.gst ,balance_sheet:result.balance_sheet})

    // }