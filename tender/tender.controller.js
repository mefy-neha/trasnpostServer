const express = require('express');
const router = express.Router();
const tender = require('./tender.model');
const user = require('../user/user.model');
const company = require('../company/company.model');
const fleet = require('../fleet/fleet.model');


/************************************TENDER ******************************************** */
router.post('/tender', (request, response) => {
    let superAdminId = request.query.superAdminId;
    // console.log('superAdmin')
    let fleetArray = request.body.fleetArray
    // console.log('fleetArray', fleetArray)
    let companyData = request.body.companyData
    // console.log('companydata', companyData)

    let y = []
    let sentResponse = {};
    let newCompanyData = []
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
            if (companyData.gst == 'gst') {
                console.log("gst")
                newCompanyData.push({ gst: result.gst })
            }
            if (companyData.road_registration_certificate == 'road_registration_certificate') {
                console.log("road_registration_certificate")
                newCompanyData.push({ road_registration_certificate: result.road_registration_certificate })
            }
            if (companyData.tradeLicense_A == 'tradeLicense_A') {
                console.log("tradeLicense_A")
                newCompanyData.push({ tradeLicense_A: result.tradeLicense_A })

            }
            if (companyData.tradeLicense_B == 'tradeLicense_B') {
                console.log("tradeLicense_B")
                newCompanyData.push({ tradeLicense_B: result.tradeLicense_B })

            }
            if (companyData.invoice_number == 'invoice_number') {
                console.log("invoice_number")
                newCompanyData.push({ invoice_number: result.invoice_number })

            }
            if (companyData.pan == 'pan') {
                console.log("pan")
                newCompanyData.push({ pan: result.pan })

            }
            if (companyData.tan == 'tan') {
                console.log("tan")
                newCompanyData.push({ tan: result.tan })

            }
            if (companyData.pf == 'pf') {
                console.log("pf")
                newCompanyData.push({ pf: result.pf })

            }
            if (companyData.professional_tax == 'professional_tax') {
                console.log("professional_tax")
                newCompanyData.push({ professional_tax: result.professional_tax })

            }
            if (companyData.esi == 'esi') {
                console.log("esi")
                newCompanyData.push({ esi: result.esi })

            }
            if (companyData.itr == 'itr') {
                console.log("itr")
                newCompanyData.push({ itr: result.itr })

            }
            if (companyData.balance_sheet == 'balance_sheet') {
                console.log("balance_sheet")
                newCompanyData.push({ balance_sheet: result.balance_sheet })

            }
            if (companyData.others == 'others') {
                console.log("others")
                newCompanyData.push({ balance_sheet: result.others })

            }

            if (fleetArray != null && fleetArray.length != 0) {
                console.log("fleet>>>>>>>>>>>>>>>>>>>>")
                fleetsData(fleetArray).then(list => {

                    sentResponse.error = false;
                    sentResponse.message = "Tender Document";
                    sentResponse.company = newCompanyData
                    sentResponse.fleet = list

                    response.status(200).json(sentResponse);
                }).catch(error => {
                    console.log(error)
                })


            }



        }
        else {
            sentResponse.error = true;
            sentResponse.message = 'Error::' + "Id doesn't exists";
            response.status(404).json(sentResponse);
        }

    })
})


async function fleetsData(fleet) {
    let fleetdata = [];
    for (const subs of fleet) {
        // console.log('substitute data',subs)
        await Promise.all([populatefields(subs)]).then(function (values) {
            // console.log('RETUNED VALUESSSS', values);
            fleetdata.push(values[0]);

            // var data = subs.toObject();
            // data.product = values[0];

            // x.push(data)       

        })
    }
    return fleetdata;
}


async function populatefields(fleets) {
    console.log('fleets', fleets)
    let sentResponse = {};
    let newFleetData = {};
    return new Promise(function (resolve, reject) {
        fleet.findOne({ _id: fleets.fleetId }, (error, result) => {
            // console.log("error>>>>>>>>>>>" + error)
            console.log("??????????fleet result" , result)
            if (error) {
                // sentResponse.error = true;
                // sentResponse.message = `Error :` + error.message + "Fleet Does not exist";
                // response.status(500).json(sentResponse);
                resolve(null)
            }
            else if (result) {
                // console.log('resultcoming ',result)
                for (var key in fleets){
                    // console.log(result[key])
                    newFleetData[key] = result[key];
                    delete newFleetData.fleetId;
                    newFleetData.fleetId=result._id;
                    newFleetData.userId=result.userId;
                    newFleetData.ownership=result.ownership;
                }
                   
                // if (fleets.truck_number == 'truck_number') {
                //     console.log("truck_number")
                //     newFleetData.truck_number= result.truck_number 
                // }
                // if (fleets.fitness == 'fitness') {
                //     // console.log("fitnesssssssss")
                //     // console.log('result ka fitness',result.fitness)
                //     newFleetData.fitness= result.fitness
                //     // console.log('i dont know',newFleetData)

                // }
                console.log('resolve(newFleetData[0])', newFleetData)
                resolve(newFleetData)


            }

        })
    })
}
/************************************END ******************************************** */
module.exports = router;
// if(fleetArray.truck_number=='truck_number'){
//     console.log("truck_number")

//             newFleetData.push({ truck_number: list.truck_number})
//             }

//             if(fleetArray.fitness == 'fitness'){
//                 console.log('fitness')
//                 newFleetData.push({ fitness: list.fitness})
//                 }
   // if (companyData.gst === 'gst'||companyData.balance_sheet == 'balance_sheet'||companyData.itr == 'itr'||companyData.esi == 'esi'||companyData.professional_tax == 'professional_tax' ||companyData.pf == 'pf'||companyData.road_registration_certificate == 'road_registration_certificate'||companyData.tradeLicense_A == 'tradeLicense_A'||companyData.tradeLicense_B == 'tradeLicense_B'||companyData.invoice == 'invoice'||companyData.pan == 'pan'||companyData.tan == 'tan') {
    //     console.log("gst",companyData.gst )
    //     x.push({ gst: result.gst ,balance_sheet:result.balance_sheet})

    // }
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