const express = require('express');
const router = express.Router();
const company = require('./company.model');
const user = require('../user/user.model');
const fleet = require('../fleet/fleet.model');
const drivers = require('../contact/contact.model');
const moment = require('moment');


/*************************COMPANY CREATION *************************/
router.post('/create', (request, response) => {
    let companyResponse = {};

    let data = new company({
        email: (request.body.email).toLowerCase(),
        organisation: request.body.organisation,
        invoice_number: request.body.invoice_number,
        road_registration_certificate: request.body.road_registration_certificate?request.body.road_registration_certificate:null,
        gst: request.body.gst?request.body.gst:null,
        msme: request.body.msme?request.body.msme:null,
        tradeLicense_A: request.body.tradeLicense_A?request.body.tradeLicense_A:null,
        tradeLicense_B: request.body.tradeLicense_B?request.body.tradeLicense_B:null,
        tradeLicenseNo: request.body.tradeLicenseNo?request.body.tradeLicenseNo:null,
        tradeLicenseId: request.body.tradeLicenseId?request.body.tradeLicenseId:null,
        registration_certificate: request.body.registration_certificate?request.body.registration_certificate:null,
        pan: request.body.pan?request.body.pan:null,
        tan: request.body.tan?request.body.tan:null,
        // balance_sheet: request.body.balance_sheet?request.body.balance_sheet:null,
        professional_tax: request.body.professional_tax?request.body.professional_tax:null,
        pf: request.body.pf?request.body.pf:null,
        esi: request.body.esi?request.body.esi:null,
        // itr: request.body.itr?request.body.itr:null,
        address:request.body.address,
        companyLogo: request.body.companyLogo,
        phoneNumber: request.body.phoneNumber,
        // others:request.body.others?request.body.others:null,
        userId: request.body.userId,
        // superAdminId: request.body.superAdminId
    });
    let new_balance_sheet=[]
    if(request.body.balance_sheet!=null){
    for(let i =0;i < request.body.balance_sheet.length; i++){
         var comingDate = moment(request.body.balance_sheet[i].financial_year).format('YYYY');
    console.log(comingDate)
    new_balance_sheet.push({financial_year:comingDate,doc:request.body.balance_sheet[i].doc})
    }
    console.log('new_balance_sheet',new_balance_sheet)
    data.balance_sheet=new_balance_sheet
}
let newItr=[]
if(request.body.itr!=null){
    for(let j =0; j< request.body.itr.length; j++){
         var itrDate = moment(request.body.itr[j].financial_year).format('YYYY');
    console.log(itrDate)
    newItr.push({financial_year:itrDate,doc:request.body.itr[j].doc})
    }
    console.log('newItr',newItr)
    data.itr=newItr
}
let new_others=[]
if(request.body.others!=null){
for(let i =0;i < request.body.others.length; i++){
     var comingDate =request.body.others[i].valid_upto? moment(request.body.others[i].valid_upto).format('YYYY-MM'):null;
console.log(comingDate)
new_others.push({valid_upto:comingDate,doc:request.body.others[i].doc?request.body.others[i].doc:null,doc_name:request.body.others[i].doc_name?request.body.others[i].doc_name:null,number:request.body.others[i].number?request.body.others[i].number:null})
}
console.log('new_others',new_others)
data.others=new_others
}
    
    // console.log(data);
    user.findById({ _id: data.userId }, (error, result) => {
        console.log('user error', error);
        // console.log('user result', result);
        if (error || result == null) {
            fleetResponse.error = true;
            fleetResponse.message = `Error :` + " User Does not exist";
            response.status(500).json(fleetResponse);
        }
        if (error) {
            console.log(error);
            companyResponse.error = true;
            companyResponse.message = `Error :` + error.message
            response.status(500).json(companyResponse);
        } 
            else {
                if(result.role=='superAdmin'){
                    console.log('role superadmin',result._id)
                    data.superAdminId=result._id
                                  
                data.save((error, result) => {
                    console.log('company error', error);
                    console.log('company result', result);
                    if (error) {
                        console.log(error);
                        companyResponse.error = true;
                        companyResponse.message = `Error :` + " Company Creation Failed";
                        response.status(500).json(companyResponse);
                    }
                   else {
                        companyResponse.error = false;
                        companyResponse.user = result;
                        companyResponse.message = `Company Created  successfull.`;
                        response.status(200).json(companyResponse);
    
                    }
    
                });
            }
            else{
                console.log('role admin',)
                data.superAdminId=result.superAdminId._id
                data.save((error, result) => {
                    console.log('company error', error);
                    console.log('company result', result);
                    if (error) {
                        console.log(error);
                        companyResponse.error = true;
                        companyResponse.message = `Error :` + "Company Creation Failed";
                        response.status(500).json(companyResponse);
                    }
                   else {
                        companyResponse.error = false;
                        companyResponse.user = result;
                        companyResponse.message = `Company Created  successfull.`;
                        response.status(200).json(companyResponse);
    
                    }
    
                }); 
            }
        
        }

    });
})
/*************************************** ENDS **************************************/

/************************** COMPANY LIST ********************************************** */
router.get('/list', (request, response) => {
    let sentResponse = {};
    company.find({}, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message;
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "ALL Company List";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/************************** CoMPANY DETAIL BY ID ********************************************** */
router.get('/companyById', (request, response) => {

    let sentResponse = {};
    let companyId = request.query.companyId
    company.findOne({ _id: companyId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);

        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + "Company Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Company Detail";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/******************************* DELETE BY ID *******************************/
router.delete('/delete', (request, response) => {
    let companyId = request.query.companyId
    let sentResponse = {}
    company.remove({ _id: companyId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Company Deleted";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/************************** COMPANY DETAIL BY ADMINID ********************************************** */
router.get('/companyByAdminId', (request, response) => {
    let adminId = request.query.adminId;
    let sentResponse = {};
    company.find({ userId: adminId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + "User Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Company List";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/************************** COMPANY DETAIL BY SUPERADMINID ********************************************** */
router.get('/companyBySuperAdminId', (request, response) => {
    let superAdminId = request.query.superAdminId;
    let sentResponse = {};
    user.findOne({ superAdminId: superAdminId }, (error, result) => {
        console.log('superAdminId error', error);
        console.log('superAdminId result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + "User Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            company.find({ superAdminId: superAdminId }, (error, result) => {
                console.log('error', error);
                console.log('result', result);
                if (error) {
                    sentResponse.error = true;
                    sentResponse.message = `Error :` + error.message + "Something Went Wrong";
                    response.status(500).json(sentResponse);
                }
                else if (result != null && Object.keys(result).length != 0) {
                    sentResponse.error = false;
                    sentResponse.message = "Company List";
                    sentResponse.result = result
                    response.status(200).json(sentResponse);

                }
                else {
                    sentResponse.error = false;
                    sentResponse.message = "No any list";
                    sentResponse.result = result
                    response.status(200).json(sentResponse);
                }

            })
        }
    })

})
/************************************END ******************************************** */
/************************************TENDER ******************************************** */
router.post('/tender', (request, response) => {
    let superAdminId = request.query.superAdminId;
    // console.log('superAdmin')
    let fleetArray = request.body.fleetArray
    // console.log('fleetArray', fleetArray)
    let companyData = request.body.companyData
    console.log('companydata', companyData.companyId)
    let driverArray = request.body.driverArray
    // console.log('driverData', driverData)
    let sentResponse = {};
    let newCompanyData = {};
    company.findOne({ superAdminId: companyData.superAdminId }, (error, result) => {
        // console.log('error', error);
        // console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + "User Does not exist";
            response.status(500).json(sentResponse);
        }
        else if (result) {
            for (var key in companyData){
                newCompanyData[key] = result[key];
                delete newCompanyData.companyId;
                newCompanyData.companyId=result._id;
                newCompanyData.userId=result.userId;
                newCompanyData.organisation=result.organisation;

                // newFleetData.ownership=result.ownership;
            }
            if (fleetArray != null && fleetArray.length != 0) {
                // console.log("fleet>>>>>>>>>>>>>>>>>>>>")
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
    // console.log('fleets', fleets)
    let sentResponse = {};
    let newFleetData = {};
    return new Promise(function (resolve, reject) {
        fleet.findOne({ _id: fleets.fleetId }, (error, result) => {
            // console.log("error>>>>>>>>>>>" + error)
            // console.log("??????????fleet result" , result)
            if (error) {
                sentResponse.error = true;
                sentResponse.message = `Error :` + error.message + "Fleet Does not exist";
                response.status(500).json(sentResponse);
                resolve(null)
            }
            else if (result) {
                // console.log('resultcoming ',result)
                for (var key in fleets){
                    // console.log('result[key] fleet',result[key])
                    // console.log('result[key] fleet',key)

                    newFleetData[key] = result[key];
                    delete newFleetData.fleetId;
                    newFleetData.fleetId=result._id;
                    newFleetData.userId=result.userId;
                    newFleetData.ownership=result.ownership;
                }
                // console.log('resolve(newFleetData[0])', newFleetData)
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
            // console.log("??????????fleet result" , result)
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
                // console.log('resolve(newDriverData[0])', newDriverData)
                resolve(newDriverData)


            }

        })
    })
}
/************************************END ******************************************** */


module.exports = router;
