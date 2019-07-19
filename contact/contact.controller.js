const express = require('express');
const router = express.Router();
const contact = require('./contact.model');
const user = require('../user/user.model');
const moment = require('moment');





/************************* Driver Creation *************************/
router.post('/create', (request, response) => {
    console.log('request body',request.body)
    let driverResponse = {};
    let data = new contact({
        name: request.body.name,
        phoneNumber: request.body.phoneNumber,
        email:request.body.email?request.body.email:null,
        company_name:request.body.company_name?request.body.company_name:null,
        website:request.body.website?request.body.website:null,
        contact_type:request.body.contact_type,
        picture: request.body.picture?request.body.picture:null,
        bank_name: request.body.bank_name,
        branch_name: request.body.branch_name,
        account_holder_name: request.body.account_holder_name,
        ifsc: request.body.ifsc,
        account_number: request.body.account_number,
        userId: request.body.userId
    });
    console.log(data);
    if(request.body.gst!=null){
   data.gst={
       doc:request.body.gst.doc?request.body.gst.doc:null,
       number:request.body.gst.number?request.body.gst.number:null,
       valid_upto:request.body.gst.valid_upto?moment(request.body.gst.valid_upto).format('YYYY-MM'):null
   }
   console.log('gst',data.gst)
}  
if(request.body.aadhar!=null){
    data.aadhar={
        doc:request.body.aadhar.doc?request.body.aadhar.doc:null,
        number:request.body.aadhar.number?request.body.aadhar.number:null,
    }
    console.log('gst',data.aadhar)
 }  
 if(request.body.voterId!=null){
    data.voterId={
        doc:request.body.voterId.doc?request.body.voterId.doc:null,
        number:request.body.voterId.number?request.body.voterId.number:null,
    }
    console.log('gst',data.voterId)
 }  
   if(request.body.pan!=null){
    data.pan={
        doc:request.body.pan.doc?request.body.pan.doc:null,
        number:request.body.pan.number?request.body.pan.number:null,
        valid_upto:request.body.pan.valid_upto?moment(request.body.pan.valid_upto).format('YYYY-MM'):null
    }
    console.log('pan',data.pan)
 }
 if(request.body.tan!=null){
    data.tan={
        doc:request.body.tan.doc?request.body.tan.doc:null,
        number:request.body.tan.number?request.body.tan.number:null,
        valid_upto:request.body.tan.valid_upto?moment(request.body.tan.valid_upto).format('YYYY-MM'):null
    }
    console.log('pan',data.tan)
 }
 if(request.body.licence!=null){
    data.licence={
        doc:request.body.licence.doc?request.body.licence.doc:null,
        number:request.body.licence.number?request.body.licence.number:null,
        valid_upto:request.body.licence.valid_upto?moment(request.body.licence.valid_upto).format('YYYY-MM'):null
    }
    console.log('pan',data.licence)
 }
 if(request.body.training_certificate!=null){
    data.training_certificate={
        doc:request.body.training_certificate.doc?request.body.training_certificate.doc:null,
        number:request.body.training_certificate.number?request.body.training_certificate.number:null,
        valid_upto:request.body.training_certificate.valid_upto?moment(request.body.training_certificate.valid_upto).format('YYYY-MM'):null
    }
    console.log('pan',data.training_certificate)
 }
 if(request.body.police_verification!=null){
    data.police_verification={
        doc:request.body.police_verification.doc?request.body.police_verification.doc:null,
        number:request.body.police_verification.number?request.body.police_verification.number:null,
        valid_upto:request.body.police_verification.valid_upto?moment(request.body.police_verification.valid_upto).format('YYYY-MM'):null
    }
    console.log('pan',data.police_verification)
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
            sentResponse.message = "Contact List";
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
            sentResponse.message = "Contact Deleted";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/******************************* CONTACT  BY ID *******************************/
router.get('/contactById', (request, response) => {
    let contactId = request.query.contactId
    let sentResponse = {}
    contact.findById({ _id: contactId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
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
/************************************ CONTACT UPDATE ******************************************** */
router.put('/update', (request, response) => {
    let sentResponse = {};
    let contactId = request.body.contactId;
    contact.findById({ _id: contactId }, (error, result) => {
        console.log('error', error)
        console.log('result', result)
        if (error || result == null) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentResponse);
        }
        else if (result) {
            result.picture = (request.body.picture ? (request.body.picture) : result.picture);
            result.phoneNumber = (request.body.phoneNumber ? (request.body.phoneNumber) : result.phoneNumber);
            result.email = (request.body.email ? (request.body.email) : result.email);

            if (request.body.gst != null) {
                result.gst = {
                    doc: request.body.gst.doc ? (request.body.gst.doc) : result.gst.doc,
                    number: request.body.gst.number ? (request.body.gst.number) : result.gst.number,
                    valid_upto: request.body.gst.valid_upto ? moment(request.body.gst.valid_upto).format('YYYY-MM-DD') : result.gst.valid_upto

                }
            }
            if (request.body.aadhar != null) {
                result.aadhar = {
                    doc: request.body.aadhar.doc ? (request.body.aadhar.doc) : result.aadhar.doc,
                    number: request.body.aadhar.number ? (request.body.aadhar.number) : result.aadhar.number
                }
            }
            if (request.body.licence != null) {
                result.licence = {
                    doc: request.body.licence.doc ? (request.body.licence.doc) : result.licence.doc,
                    number: request.body.licence.number ? (request.body.licence.number) : result.licence.number,
                    valid_upto: request.body.licence.valid_upto ? moment(request.body.licence.valid_upto).format('YYYY-MM-DD') : result.licence.valid_upto

                }
            }
            if (request.body.training_certificate != null) {
                result.training_certificate = {
                    doc: request.body.training_certificate.doc ? (request.body.training_certificate.doc) : result.training_certificate.doc,
                    number: request.body.training_certificate.number ? (request.body.training_certificate.number) : result.training_certificate.number,
                    valid_upto: request.body.training_certificate.valid_upto ? moment(request.body.training_certificate.valid_upto).format('YYYY-MM-DD') : result.training_certificate.valid_upto

                }
            }
            if (request.body.police_verification != null) {
                result.police_verification = {
                    doc: request.body.police_verification.doc ? (request.body.police_verification.doc) : result.police_verification.doc,
                    number: request.body.police_verification.number ? (request.body.police_verification.number) : result.police_verification.number,
                    valid_upto: request.body.police_verification.valid_upto ? moment(request.body.police_verification.valid_upto).format('YYYY-MM-DD') : result.police_verification.valid_upto

                }
            }
            if (request.body.pan != null) {
                result.pan = {
                    doc: request.body.pan.doc ? (request.body.pan.doc) : result.pan.doc,
                    number: request.body.pan.number ? (request.body.pan.number) : result.pan.number ,
                    valid_upto: request.body.pan.valid_upto ? moment(request.body.pan.valid_upto).format('YYYY-MM-DD') : result.pan.valid_upto

                              }
            }
            if (request.body.tan != null) {
                result.tan = {
                    doc: request.body.tan.doc ? (request.body.tan.doc) : result.tan.doc,
                    number: request.body.tan.number ? (request.body.tan.number) : result.tan.number,
                    valid_upto: request.body.tan.valid_upto ? moment(request.body.tan.valid_upto).format('YYYY-MM-DD') : result.tan.valid_upto

                }
            }
       
            if (request.body.voterId != null) {
                result.voterId = {
                    doc: request.body.voterId.doc ? (request.body.voterId.doc) : result.voterId.doc,
                    number: request.body.voterId.number ? (request.body.voterId.number) : result.voterId.number,

                }
            }
                    if (request.body.others != null) {
                        let update_others=[];
                                for(let i =0;i < request.body.others.length; i++){
                                    var comingDate = moment(request.body.others[i].valid_upto).format('YYYY-MM-DD');
                                    console.log(comingDate)
                                    update_others.push({doc_name:request.body.others[i].doc_name,doc:request.body.others[i].doc,number:request.body.others[i].number,valid_upto:comingDate})
                               }
                               console.log('update_others',update_others)
                        result.others = (request.body.others ? (update_others) : result.others);
                             
                        }
            result.save((error, result) => {
                console.log(' save error', error)
                if (error) {
                    sentResponse.error = true;
                    sentResponse.message = `Error :` + error.message + " Not update";
                    response.status(500).json(sentResponse);
                }
                else {
                    sentResponse.error = false;
                    sentResponse.message = "Contact Updated";
                    sentResponse.result = result
                    response.status(200).json(sentResponse);

                }
            })

        }


    })
})
/************************************END ******************************************** */

module.exports = router;
