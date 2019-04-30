const express = require('express');
const router = express.Router();
const contractor = require('./contractor.model');

/*************************CONTRACTOR CREATION *************************/
router.post('/create', (request, response) => {
    let contractorResponse = {};
    let data = new contractor({
        email: (request.body.email).toLowerCase(),
        companyName: request.body.companyName,
        contactPersonName: request.body.contactPersonName,
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
        currency: request.body.currency,
        phoneNumber: request.body.phoneNumber,
        userId: request.body.userId
    });
    console.log(data);
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
})
/*************************************** ENDS **************************************/

/************************** COMPANY LIST ********************************************** */
router.get('/list', (request, response) => {
    let sentResponse = {};
    contractor.find({}, (error, result) => {
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
    let contractorId = request.query.contractorId
    company.findOne({ _id: contractorId }, (error, result) => {
        console.log('error',error);
        console.log('result',result);

        if (error) {
            sentresponse.error = true;
            sentresponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentresponse);
        }
        else {
            sentresponse.error = true;
            sentresponse.message = "Contract Detail";
            sentResponse.result = result
            response.status(500).json(sentresponse);

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
            sentresponse.error = true;
            sentresponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentresponse);
        }
        else {
            sentresponse.error = true;
            sentresponse.message = "Contract Deleted";
            sentResponse.result = result
            response.status(500).json(sentresponse);

        }

    })
})
/************************************END ******************************************** */

module.exports = router;
