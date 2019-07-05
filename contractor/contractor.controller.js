const express = require('express');
const router = express.Router();
const contractor = require('./contractor.model');
const user = require('../user/user.model');


/*************************CONTRACTOR CREATION *************************/
router.post('/create', (request, response) => {
    let contractorResponse = {};
    let data = new contractor({
        email: (request.body.email).toLowerCase(),
        companyName: request.body.companyName,
        contactPersonName: request.body.contactPersonName,
        bank_name: request.body.bank_name,
        branch_name: request.body.branch_name,
        account_holder_name: request.body.account_holder_name,
        ifsc: request.body.ifsc,
        account_number: request.body.account_number,
        regNo: request.body.regNo,
        regId: request.body.regId,
        gstNo: request.body.gstNo,
        gstId: request.body.gstId,
        tradeLicenseNo: request.body.tradeLicenseNo,
        tradeLicenseId: request.body.tradeLicenseId,
        invoiceNo: request.body.invoiceNo,
        invoiceId: request.body.invoiceId,
        panCard: request.body.panCard,
        panId: request.body.panId,
        address: request.body.address,
        companyLogo: request.body.companyLogo,
        phoneNumber: request.body.phoneNumber,
        userId: request.body.userId,
        superAdminId: request.body.superAdminId
    });
    console.log(data);
if (result.role == 'superAdmin') {
    console.log('superAdmin')
    data.superAdminId = result._id
    data.save((error, result) => {
        console.log('error',error);
        console.log('result',result);
        if (error) {
            console.log(error);
            contractorResponse.error = true;
            contractorResponse.message = `Error :` + error.message
            response.status(500).json(contractorResponse);
        } else {
            console.log(result);
            contractorResponse.error = false;
            contractorResponse.user = result;
            contractorResponse.message = `Contractor Created  successfull.`;
            response.status(200).json(contractorResponse);
    
        }
    
    });
}
else {
    console.log('admin,other')
    data.superAdminId = result.superAdminId._id
    data.save((error, result) => {
        console.log('error',error);
        console.log('result',result);
        if (error) {
            console.log(error);
            contractorResponse.error = true;
            contractorResponse.message = `Error :` + error.message
            response.status(500).json(contractorResponse);
        } else {
            console.log(result);
            contractorResponse.error = false;
            contractorResponse.user = result;
            contractorResponse.message = `Contractor Created  successfull.`;
            response.status(200).json(contractorResponse);
    
        }
    
    });
}
   
})
/*************************************** ENDS **************************************/

/************************** COMPANY LIST ********************************************** */
router.get('/list', (request, response) => {
    let sentResponse = {};
    contractor.find({}, (error, result) => {
        console.log('error',error);
        console.log('result',result);
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
/************************** CoMPANY DETAIL BY ID ********************************************** */
router.get('/contractById', (request, response) => {

    let sentResponse = {};
    let contractorId = request.query.contractorId
    contractor.findOne({ _id: contractorId }, (error, result) => {
        console.log('error',error);
        console.log('result',result);

        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Contract Detail";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/******************************* DELETE BY ID *******************************/
router.delete('/delete',(request,response)=>{
    let contractorId=request.query.contractorId
    let sentResponse={}
    contractor.remove({_id:contractorId},(error,result)=>{
        console.log('error',error);
        console.log('result',result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Contract Deleted";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/************************** CONTRACT DETAIL BY ADMINID ********************************************** */
router.get('/contractByAdminId', (request, response) => {
    let adminId = request.query.adminId;
    let sentResponse = {};
    contractor.find({ userId: adminId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + "User Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Contract List";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/************************** CONTRACT DETAIL BY SUPERADMINID ********************************************** */
router.get('/contractBySuperAdminId', (request, response) => {
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
            contractor.find({ superAdminId: superAdminId }, (error, result) => {
                console.log('error', error);
                console.log('result', result);
                if (error) {
                    sentResponse.error = true;
                    sentResponse.message = `Error :` + error.message + "Something Went Wrong";
                    response.status(500).json(sentResponse);
                }
                else if (result != null && Object.keys(result).length != 0) {
                    sentResponse.error = false;
                    sentResponse.message = "Contract List";
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
/************************** CONTRACT DETAIL BY USERID ********************************************** */
router.get('/contractByUserId', (request, response) => {
    let userId = request.query.userId;
    let sentResponse = {};
    contractor.find({ userId: userId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + "User Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "CONTRACT List";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */

module.exports = router;
