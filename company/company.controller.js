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
            sentresponse.error = true;
            sentresponse.message = `Error :` + error.message;
            response.status(500).json(sentresponse);
        }
        else {
            sentresponse.error = true;
            sentresponse.message = "ALL Company List";
            sentResponse.result = result
            response.status(500).json(sentresponse);

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
            sentresponse.error = true;
            sentresponse.message = `Error :` + error.message + "Company Does not exist";
            response.status(500).json(sentresponse);
        }
        else {
            sentresponse.error = true;
            sentresponse.message = "Company Detail";
            sentResponse.result = result
            response.status(500).json(sentresponse);

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
            sentresponse.error = true;
            sentresponse.message = "Company Deleted";
            sentResponse.result = result
            response.status(500).json(sentresponse);

        }

    })
})
/************************************END ******************************************** */
module.exports = router;
