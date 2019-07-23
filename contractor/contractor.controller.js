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
        commission_percent:request.body.commission_percent,
        userId: request.body.userId,
        superAdminId: request.body.superAdminId
    });
    console.log(data);
    user.findById({ _id: data.userId }, (error, result) => {
        console.log('result error', error);
        console.log('result result', result);
        if (error) {
            console.log(error);
            invoiceResponse.error = true;
            invoiceResponse.message = `Error :` + " User does not exist";
            response.status(500).json(invoiceResponse);
        }
        else {
            if (result.role == 'superAdmin') {
                console.log('superAdmin')
                data.save((error, result) => {
                    console.log('error', error);
                    console.log('result', result);
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
                data.save((error, result) => {
                    console.log('error', error);
                    console.log('result', result);
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
        }
    })


})
/*************************************** ENDS **************************************/

/************************** COMPANY LIST ********************************************** */
router.get('/list', (request, response) => {
    let sentResponse = {};
    contractor.find({}, (error, result) => {
        console.log('error', error);
        console.log('result', result);
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
        console.log('error', error);
        console.log('result', result);

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
router.delete('/delete', (request, response) => {
    let contractorId = request.query.contractorId
    let sentResponse = {}
    contractor.remove({ _id: contractorId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
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
/************************************ CONTRACTOR UPDATE ******************************************** */
router.put('/update', (request, response) => {
    let sentResponse = {};
    let contractorId = request.body.contractorId;
    contractor.findById({ _id: contractorId }, (error, result) => {
        console.log('error', error)
        console.log('result', result)
        if (error || result == null) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentResponse);
        }
        else if (result) {
            result.companyName = (request.body.companyName ? (request.body.companyName) : result.companyName);
            result.contactPersonName = (request.body.contactPersonName ? (request.body.contactPersonName) : result.contactPersonName);
            result.email = (request.body.email ? (request.body.email) : result.email);
            result.bank_name = (request.body.bank_name ? (request.body.bank_name) : result.bank_name);
            result.branch_name = (request.body.branch_name ? (request.body.branch_name) : result.branch_name);
            result.account_holder_name = (request.body.account_holder_name ? (request.body.account_holder_name) : result.account_holder_name);
            result.ifsc = (request.body.ifsc ? (request.body.ifsc) : result.ifsc);
            result.account_number = (request.body.account_number ? (request.body.account_number) : result.account_number);
            result.regNo = (request.body.regNo ? (request.body.regNo) : result.regNo);
            result.regId = (request.body.regId ? (request.body.regId) : result.regId);
            result.gstNo = (request.body.gstNo ? (request.body.gstNo) : result.gstNo);
            result.gstId = (request.body.gstId ? (request.body.gstId) : result.gstId);
            result.tradeLicenseNo = (request.body.tradeLicenseNo ? (request.body.tradeLicenseNo) : result.tradeLicenseNo);
            result.invoiceNo = (request.body.invoiceNo ? (request.body.invoiceNo) : result.invoiceNo);
            result.invoiceId = (request.body.invoiceId ? (request.body.invoiceId) : result.invoiceId);
            result.panCard = (request.body.panCard ? (request.body.panCard) : result.panCard);
            result.panId = (request.body.panId ? (request.body.panId) : result.panId);
            result.address = (request.body.address ? (request.body.address) : result.address);
            result.companyLogo = (request.body.companyLogo ? (request.body.companyLogo) : result.companyLogo);
            result.phoneNumber = (request.body.phoneNumber ? (request.body.phoneNumber) : result.phoneNumber);
            result.commission_percent = (request.body.commission_percent ? (request.body.commission_percent) : result.commission_percent);
            result.save((error, result) => {
                console.log(' save error', error)
                if (error) {
                    sentResponse.error = true;
                    sentResponse.message = `Error :` + error.message + " Not update";
                    response.status(500).json(sentResponse);
                }
                else {
                    sentResponse.error = false;
                    sentResponse.message = "Contractor Updated";
                    sentResponse.result = result
                    response.status(200).json(sentResponse);

                }
            })

        }


    })
})
/************************************END ******************************************** */

module.exports = router;
