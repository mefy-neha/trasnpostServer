const express = require('express');
const router = express.Router();
const company = require('./company.model');
const user = require('../user/user.model');


/*************************COMPANY CREATION *************************/
router.post('/create', (request, response) => {
    let companyResponse = {};

    let data = new company({
        email: (request.body.email).toLowerCase(),
        organisation: request.body.organisation,
        road_registration_certificate: request.body.road_registration_certificate,
        gst: request.body.gst,
        tradeLicense_A: request.body.tradeLicense_A,
        tradeLicense_B: request.body.tradeLicense_B,
        tradeLicenseNo: request.body.tradeLicenseNo,
        tradeLicenseId: request.body.tradeLicenseId,
        invoice: request.body.invoice,
        pan: request.body.pan,
        tan: request.body.tan,
        panId: request.body.panId,
        balance_sheet: request.body.balance_sheet,
        professional_tax: request.body.professional_tax,
        pf: request.body.pf,
        esi: request.body.esi,
        itr: request.body.itr,
        address:request.body.address,
        companyLogo: request.body.companyLogo,
        phoneNumber: request.body.phoneNumber,
        userId: request.body.userId,
        // superAdminId: request.body.superAdminId
    });
    console.log(data);
    user.findById({ _id: data.userId }, (error, result) => {
        console.log('user error', error);
        console.log('user result', result);
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
module.exports = router;
