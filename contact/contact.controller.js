const express = require('express');
const router = express.Router();
const contact = require('./contact.model');

/*************************COMPANY CREATION *************************/
router.post('/create',(request,response)=>{
    let contactResponse = {};    
    let data = new contact({
        email: (request.body.email).toLowerCase(),
        company_name: request.body.company_name,
        contactType: request.body.contactType,
        phoneNumber: request.body.phoneNumber,
        website:request.body.website,
        adminId:request.body.adminId
    });
    console.log(data);
    data.save((error, result) => {
        console.log('error',error);
        console.log('result',result);
        if (error) {
            console.log(error);
            contactResponse.error = true;
            contactResponse.message = `Error :`+error.message
            response.status(500).json(contactResponse);
        } else {
            console.log(result);
            contactResponse.error = false;
            contactResponse.user = result;
            contactResponse.message = `Contact Created  successfull.`;
            response.status(200).json(contactResponse);

        }

    });
})
/*************************************** ENDS **************************************/

/************************** COMPANY LIST ********************************************** */
router.get('/list', (request, response) => {
    let sentResponse = {};
    contact.find({}, (error, result) => {
        console.log('error',error);
        console.log('result',result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message;
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "ALL Contact List";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/************************** CoMPANY DETAIL BY ID ********************************************** */
router.get('/contactById', (request, response) => {

    let sentResponse = {};
    let contactId = request.query.contactId
    contact.findOne({ _id: contactId }, (error, result) => {
        console.log('error',error);
        console.log('result',result);

        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + "Contact Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Contact Detail";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/******************************* DELETE BY ID *******************************/
router.delete('/delete',(request,response)=>{
    let contactId=request.query.contactId
    let sentResponse={}
    contact.remove({_id:contactId},(error,result)=>{
        console.log('error',error);
        console.log('result',result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Contact Deleted";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/************************** CONTACT DETAIL BY ADMINID ********************************************** */
router.get('/contactById', (request, response) => {
    let adminId = request.query.adminId;
    let sentResponse = {};
    contact.find({ adminId: adminId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + "Contact Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Contact List";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
module.exports = router;
