const express = require('express');
const router = express.Router();
const company = require('./company.model');
const user = require('../user/user.model');
const moment = require('moment');


/*************************COMPANY CREATION *************************/
router.post('/create', (request, response) => {
    let companyResponse = {};

    let data = new company({
        email: (request.body.email).toLowerCase(),
        organisation: request.body.organisation,
        road_registration_certificate: request.body.road_registration_certificate?request.body.road_registration_certificate:null,
        gst: request.body.gst?request.body.gst:null,
        msme: request.body.msme?request.body.msme:null,
        tradeLicense_A: request.body.tradeLicense_A?request.body.tradeLicense_A:null,
        tradeLicense_B: request.body.tradeLicense_B?request.body.tradeLicense_B:null,
        tradeLicenseNo: request.body.tradeLicenseNo?request.body.tradeLicenseNo:null,
        tradeLicenseId: request.body.tradeLicenseId?request.body.tradeLicenseId:null,
        invoice: request.body.invoice?request.body.invoice:null,
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
router.get('/tender', (request, response) => {
    let superAdminId = request.query.superAdminId;
    let gst=request.query.gst
    let sentResponse = {};
    let x=[]
    company.find({ superAdminId: superAdminId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + "User Does not exist";
            response.status(500).json(sentResponse);
        }
        else if(result) {
            if(gst=='gst'){
                x.push(result[0].gst)

            }
            console.log('xxxx',x)

           








            
            sentResponse.error = false;
            sentResponse.message = "Company List";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */


module.exports = router;
