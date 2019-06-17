const express = require('express');
const router = express.Router();
const bankFile = require('./bankFile.model');
const user = require('../user/user.model');

/************************************BANK CREATION ******************************************** */
router.post('/create', (request, response) => {
    let bankResponse = {};
    let data = new bankFile({
        file_data:request.body.file_data  ,
        userId:request.body.userId 
    })
    console.log('dataaaa', data)
    user.findById({ _id: data.userId }, (error, result) => {
        console.log('result error', error);
        console.log('result result', result);
        if (error) {
            console.log(error);
            bankResponse.error = true;
            bankResponse.message = `Error :` + " User does not exist";
            response.status(500).json(bankResponse);
        }
        else {
                // data.organisation = result.organisation
            if (result.role == 'superAdmin') {
                console.log('superAdmin')
                data.superAdminId = result._id
                data.save((error, result) => {
                    console.log('BANK error', error);
                    console.log('Bank result', result);
                    if (error) {
                        console.log(error);
                        bankResponse.error = true;
                        bankResponse.message = `Error :` + " creation failed";
                        response.status(500).json(bankResponse);
                    } else {

                        bankResponse.error = false;
                        bankResponse.result = result;
                        bankResponse.message = `Bank File is created  successfull.`;
                        response.status(200).json(bankResponse);
                    }
                })
            }
            else {
                console.log('admin,other')
                data.superAdminId = result.superAdminId._id
                data.save((error, result) => {
                    console.log('Bank error', error);
                    console.log('Bank result', result);
                    if (error) {
                        console.log(error);
                        bankResponse.error = true;
                        bankResponse.message = `Error :` + " creation failed";
                        response.status(500).json(bankResponse);
                    } else {
                        bankResponse.error = false;
                        bankResponse.result = result;
                        bankResponse.message = `Bank File is created  successfull.`;
                        response.status(200).json(bankResponse);
                    }
                })
            }
        }

    })

})

/************************************END ******************************************** */
/************************** BANK LIST ********************************************** */
router.get('/list', (request, response) => {
    let sentResponse = {};
    bankFile.find({}, (error, result) => {
        console.log('error',error);
        console.log('result',result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message;
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "ALL Bank File List";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/************************** BANK FILE DETAIL BY SUPERADMINID ********************************************** */
router.get('/bankFileList', (request, response) => {
    let superAdminId = request.query.superAdminId;
    let sentResponse = {};
    user.findById({ _id: superAdminId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error || result == null) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error + '  ' + "User Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            console.log('role superadmin')
            bankFile.find({ superAdminId: superAdminId }, (error, result) => {
                console.log('error', error);
                console.log('result', result);
                if (error) {
                    sentResponse.error = true;
                    sentResponse.message = `Error :` + error.message + "Something went wrong";
                    response.status(500).json(sentResponse);
                }
                else {
                    sentResponse.error = false;
                    sentResponse.message = "Bank File List";
                    sentResponse.result = result
                    response.status(200).json(sentResponse);

                }

            })
        }
    })
})
/************************************END ******************************************** */
/******************************* DELETE BY ID *******************************/
router.delete('/delete',(request,response)=>{
    let bankId=request.query.bankId
    let sentResponse={}
    bankFile.remove({_id:bankId},(error,result)=>{
        console.log('error',error);
        console.log('result',result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Bank File Deleted";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
module.exports = router;