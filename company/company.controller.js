const express = require('express');
const router = express.Router();
const company = require('./company.model');

/*************************COMPANY CREATION *************************/
router.post('/create',(request,response)=>{
    let companyResponse = {};
    
    let data = new company({
        email: (request.body.email).toLowerCase(),
        companyName: request.body.companyName,
        regNo: request.body.regNo,
        regId:request.body.regId,
        gstNo: request.body.gstNo,
        gstId:request.body.gstId,
        tradeLicenseNo: request.body.tradeLicenseNo,
        tradeLicenseId:request.body.tradeLicenseId,
        invoiceNo: request.body.invoiceNo,
        invoiceId:request.body.invoiceId,
        panCard: request.body.panCard,
        panId:request.body.panId,
        address: request.body.address,
        companyLogo: request.body.companyLogo,
        currency: request.body.currency,
        phoneNumber: request.body.phoneNumber,
        userId:request.body.userId
    });
    console.log(data);
    data.save((error, result) => {
        console.log('error',error);
        console.log('result',result);
        if (error) {
            console.log(error);
            companyResponse.error = true;
            companyResponse.message = `Error :`+error.message
            response.status(500).json(companyResponse);
        } else {
            console.log(result);
            companyResponse.error = false;
            companyResponse.user = result;
            companyResponse.message = `Company Created  successfull.`;
            response.status(200).json(companyResponse);

        }

    });
})
/*************************************** ENDS **************************************/

/************************** COMPANY LIST ********************************************** */
router.get('/list', (request, response) => {
    let sentResponse = {};
    company.find({}, (error, result) => {
        console.log('error',error);
        console.log('result',result);
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
        console.log('error',error);
        console.log('result',result);

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
router.delete('/delete',(request,response)=>{
    let companyId=request.query.companyId
    let sentResponse={}
    console.log('error',error);
        console.log('result',result);
    company.remove({_id:companyId},(error,result)=>{
        if (error) {
            sentresponse.error = true;
            sentresponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentresponse);
        }
        else {
            sentresponse.error = false;
            sentresponse.message = "Company Deleted";
            sentResponse.result = result
            response.status(200).json(sentresponse);

        }

    })
})
/************************************END ******************************************** */
/************************** USER DETAIL BY ID ********************************************** */
router.get('/companyByUserId', (request, response) => {
    let userId = request.query.userId;
    let sentResponse = {};
    company.find({ userId: userId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + "User Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            console.log('hhh',result[0].userId.organisation)

            sentResponse.error = false;
            sentResponse.message = "Company List";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/************************** USER DETAIL BY SUPERADMINID ********************************************** */
router.get('/companyBySuperAdminId', (request, response) => {
    let superAdminId = request.query.superAdminId;
    let sentResponse = {};
    company.find({ userId: superAdminId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + "User Does not exist";
            response.status(500).json(sentResponse);
        }
        else if( result!= null && Object.keys(result).length != 0) {
            let companylisty=[]
            // for (let i = 0; i <= result.length; i++){

            // }
            console.log(result.userId.organisation)

            sentResponse.error = false;
            sentResponse.message = "Company List";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }
        else{
            sentResponse.error = false;
            sentResponse.message = "No any list";
            sentResponse.result = result
            response.status(200).json(sentResponse);
        }

    })
})
/************************************END ******************************************** */
module.exports = router;
