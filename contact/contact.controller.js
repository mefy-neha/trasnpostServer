const express = require('express');
const router = express.Router();
const contact = require('./contact.model');
const user = require('../user/user.model');
const moment = require('moment');





/************************* Driver Creation *************************/
router.post('/create', (request, response) => {
    let driverResponse = {};
    let data = new contact({
        name: request.body.name,
        phoneNumber: request.body.phoneNumber,
        email:request.body.email?request.body.email:null,
        company_name:request.body.company_name?request.body.company_name:null,
        website:request.body.website?request.body.website:null,
        contact_type:request.body.contact_type,
    //    gst:request.body.gst?request.body.gst:null,
        // pan:request.body.pan?request.body.pan:null,
        // tan:request.body.tan?request.body.tan:null,
        voterId:request.body.voterId?request.body.voterId:null,
        aadhar: request.body.aadhar?request.body.aadhar:null,
        // licence: request.body.licence?request.body.licence:null,
        // training_certificate: request.body.training_certificate?request.body.training_certificate:null,
        // police_verification: request.body.police_verification?request.body.police_verification:null,
        // others: request.body.others,
        picture: request.body.picture?request.body.picture:null,
        userId: request.body.userId
    });
    console.log(data);
    if(request.body.gst!=null){
   data.gst={
       doc:request.body.gst.doc,
       number:request.body.gst.number,
       valid_upto:moment(request.body.gst.valid_upto).format('MM-YYYY')
   }
   console.log('gst',data.gst)
}  
   if(request.body.pan!=null){
    data.pan={
        doc:request.body.pan.doc,
        number:request.body.pan.number,
        valid_upto:moment(request.body.pan.valid_upto).format('MM-YYYY')
    }
    console.log('pan',data.pan)
 }
 if(request.body.tan!=null){
    data.tan={
        doc:request.body.tan.doc,
        number:request.body.tan.number,
        valid_upto:request.body.tan.valid_upto?moment(request.body.tan.valid_upto).format('MM-YYYY'):null
    }
    console.log('pan',data.tan)
 }
 if(request.body.licence!=null){
    data.licence={
        doc:request.body.licence.doc,
        number:request.body.licence.number,
        valid_upto:request.body.licence.valid_upto?moment(request.body.licence.valid_upto).format('MM-YYYY'):null
    }
    console.log('pan',data.licence)
 }
 if(request.body.training_certificate!=null){
    data.training_certificate={
        doc:request.body.training_certificate.doc,
        number:request.body.training_certificate.number,
        valid_upto:request.body.training_certificate.valid_upto?moment(request.body.training_certificate.valid_upto).format('MM-YYYY'):null
    }
    console.log('pan',data.training_certificate)
 }
 if(request.body.police_verification!=null){
    data.police_verification={
        doc:request.body.police_verification.doc,
        number:request.body.police_verification.number,
        valid_upto:request.body.police_verification.valid_upto?moment(request.body.police_verification.valid_upto).format('MM-YYYY'):null
    }
    console.log('pan',data.police_verification)
 }
 if(request.body.others!=null){
    data.others={
        doc:request.body.others.doc,
        number:request.body.others.number,
        valid_upto:request.body.others.valid_upto?moment(request.body.others.valid_upto).format('MM-YYYY'):null
    }
    console.log('pan',data.others)
 }
    user.findById({ _id: data.userId }, (error, result) => {
        console.log('user error', error);
        console.log('user result', result);
        if (error || result == null) {
            console.log(error);
            driverResponse.error = true;
            driverResponse.message = `Error :` + " User does not exist";
            response.status(500).json(driverResponse);
        } else {
            data.role = result.role,
                data.organisation = result.organisation
            if (result.role == 'superAdmin') {
                console.log('superAdmin')
                data.superAdminId = result._id
                data.save((error, result) => {
                    console.log('Driver error', error);
                    console.log('Driver result', result);
                    if (error) {
                        console.log(error);
                        driverResponse.error = true;
                        driverResponse.message = `Error :` + " creation failed";
                        response.status(500).json(driverResponse);
                    } else {

                        driverResponse.error = false;
                        driverResponse.result = result;
                        driverResponse.message = `Driver is created  successfull.`;
                        response.status(200).json(driverResponse);
                    }
                })
            }
            else {
                console.log('admin,other')
                data.superAdminId = result.superAdminId._id
                data.save((error, result) => {
                    console.log('Driver error', error);
                    console.log('Driver result', result);
                    if (error) {
                        console.log(error);
                        driverResponse.error = true;
                        driverResponse.message = `Error :` + " creation failed";
                        response.status(500).json(driverResponse);
                    } else {

                        driverResponse.error = false;
                        driverResponse.result = result;
                        driverResponse.message = `Driver is created  successfull.`;
                        response.status(200).json(driverResponse);
                    }
                })
            }
        }
    })
});

/************************************END ******************************************** */
/************************************* LIST OF DRIVER ***************************/
router.get('/list', (request, response) => {
    let sentResponse = {};
    contact.find({}, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message;
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Driver List";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/************************** DRIVER DETAIL BY USERID ********************************************** */
router.get('/contactlist', (request, response) => {
    let superAdminId = request.query.superAdminId;
    let sentResponse = {};
    user.findById({ _id: superAdminId }, (error, result) => {
        console.log('error...........', error);
        console.log('result', result);
        if (error || result==null) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error+ '  ' + "User Does not exist";
            response.status(500).json(sentResponse);
        }
else{
        console.log('role superadmin')
        contact.find({ superAdminId: superAdminId }, (error, result) => {
            console.log('error', error);
            console.log('result', result);
            if (error) {
                sentResponse.error = true;
                sentResponse.message = `Error :` + error.message + "Something went wrong";
                response.status(500).json(sentResponse);
            }
            else {
                sentResponse.error = false;
                sentResponse.message = "Driver List";
                sentResponse.result = result
                response.status(200).json(sentResponse);

            }

        })
    }
    })
})
/************************************END ******************************************** */
/******************************* DELETE BY ID *******************************/
router.delete('/delete', (request, response) => {
    let contactId = request.query.contactId
    let sentResponse = {}
    contact.remove({ _id: contactId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Driver Deleted";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/************************** DRIVER DETAIL BY USERID ********************************************** */
router.get('/listByContactType', (request, response) => {
    let superAdminId = request.query.superAdminId;
    let contact_type = request.query.contact_type;
    let sentResponse = {};
    user.findById({ _id: superAdminId }, (error, result) => {
        console.log('error...........', error);
        console.log('result', result);
        if (error || result==null) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error+ '  ' + "User Does not exist";
            response.status(500).json(sentResponse);
        }
else{
        console.log('role superadmin')
        contact.find({ $and: [ { superAdminId:superAdminId},{ contact_type:contact_type}]}, (error, result) => {
            console.log('error', error);
            console.log('result', result);
            if (error) {
                sentResponse.error = true;
                sentResponse.message = `Error :` + error.message + "Something went wrong";
                response.status(500).json(sentResponse);
            }
            else {
                sentResponse.error = false;
                sentResponse.message = "List by Contact Type";
                sentResponse.result = result
                response.status(200).json(sentResponse);

            }

        })
    }
    })
})
/************************************END ******************************************** */

module.exports = router;
