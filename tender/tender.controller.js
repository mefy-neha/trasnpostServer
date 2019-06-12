const express = require('express');
const router = express.Router();
const tender = require('./tender.model');
const user = require('../user/user.model');
const company = require('../company/company.model');
const fleet = require('../fleet/fleet.model');
const drivers = require('../contact/contact.model');



/************************************TENDER ******************************************** */
router.post('/tender', (request, response) => {
    let superAdminId = request.query.superAdminId;
    // console.log('superAdmin')
    let fleetArray = request.body.fleetArray
    // console.log('fleetArray', fleetArray)
    let companyData = request.body.companyData
    // console.log('companydata', companyData)
    let driverArray = request.body.driverArray
    // console.log('driverData', driverData)

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
                fleetsData(fleetArray).then(fleetList => {
                    if (fleetArray != null && fleetArray.length != 0) {
                        driverData(driverArray).then(driverList=>{

                            sentResponse.error = false;
                            sentResponse.message = "Tender Document";
                            sentResponse.company = newCompanyData
                            sentResponse.fleet = fleetList
                            sentResponse.driver = driverList

                            response.status(200).json(sentResponse);
                        }).catch(err=>{
                            console.log('err',err)
                        })
                    }
                                    
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

//*******************************FOR FLEET *******************************************/
async function fleetsData(fleet) {
    let fleetdata = [];
    for (const subs of fleet) {
        // console.log('substitute data',subs)
        await Promise.all([fleetfields(subs)]).then(function (values) {
            // console.log('RETUNED VALUESSSS', values);
            fleetdata.push(values[0]);

            // var data = subs.toObject();
            // data.product = values[0];

            // x.push(data)       

        })
    }
    return fleetdata;
}


async function fleetfields(fleets) {
    console.log('fleets', fleets)
    let sentResponse = {};
    let newFleetData = {};
    return new Promise(function (resolve, reject) {
        fleet.findOne({ _id: fleets.fleetId }, (error, result) => {
            // console.log("error>>>>>>>>>>>" + error)
            console.log("??????????fleet result" , result)
            if (error) {
                sentResponse.error = true;
                sentResponse.message = `Error :` + error.message + "Fleet Does not exist";
                response.status(500).json(sentResponse);
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
                console.log('resolve(newFleetData[0])', newFleetData)
                resolve(newFleetData)


            }

        })
    })
}
/************************************END ******************************************** */
/***********************************FOR DRIVER ***************************************** */
async function driverData(driver) {
    let driverdata = [];
    for (const subs of driver) {
        // console.log('substitute data',subs)
        await Promise.all([driverfields(subs)]).then(function (values) {
            // console.log('RETUNED VALUESSSS', values);
            driverdata.push(values[0]);
        })
    }
    return driverdata;
}


async function driverfields(driver) {
    console.log('driver', driver)
    let sentResponse = {};
    let newDriverData = {};
    return new Promise(function (resolve, reject) {
        drivers.findById({ _id: driver.driverId }, (error, result) => {
            // console.log("error>>>>>>>>>>>" + error)
            console.log("??????????fleet result" , result)
            if (error) {
                sentResponse.error = true;
                sentResponse.message = `Error :` + error.message + "Driver Does not exist";
                response.status(500).json(sentResponse);
                resolve(null)
            }
            else if (result) {
                // console.log('resultcoming ',result)
                for (var key in driver){
                    // console.log(result[key])
                    newDriverData[key] = result[key];
                    delete newDriverData.driverId;
                    newDriverData.driverId=result._id;
                    newDriverData.userId=result.userId;
                }
                console.log('resolve(newDriverData[0])', newDriverData)
                resolve(newDriverData)


            }

        })
    })
}
module.exports = router;