const express = require('express');
const router = express.Router();
const account = require('./account.model');
const user = require('../user/user.model');
const accountType = require('./accountType.model')



/************************ ACCOUNT CREATION **************************/

router.post('/create', (request, response) => {
    let accountResponse = {};
    let data = new account({
        accountName: request.body.accountName,
        accountType: request.body.accountType,
        description: request.body.description,
        accountCode: request.body.accountCode,
        organisation: request.body.organisation,
        subAccount: request.body.subAccount,
        accountAgainst: request.body.accountAgainst,
        userId: request.body.userId
    });
    console.log(data);
    user.findById({ _id: userId }, (error, result) => {
        console.log('user error', error);
        console.log('user result', result);
        if (error || result == null) {
            accountResponse.error = true;
            accountResponse.message = `Error :` + " User Does not exist";
            response.status(500).json(accountResponse);
        }
        else {
            if (result.role === 'accounts') {
                data.save((error, result) => {
                    console.log('account error', error);
                    console.log('account result', result);
                    if (error) {
                        console.log(error);
                        accountResponse.error = true;
                        accountResponse.message = `Error :` + " Role must be Accounts/Account creaton failed";
                        response.status(500).json(accountResponse);
                    } else {
                        console.log(result);
                        accountResponse.error = false;
                        accountResponse.user = result;
                        accountResponse.message = `Account Creation is  successfull.`;
                        response.status(200).json(accountResponse);

                    }

                });
            }
            else {

            }

        }


    })
})
/************************************END ******************************************** */

/************************** ACCOUNT LIST ********************************************** */
router.get('/list', (request, response) => {
    let sentResponse = {};
    account.find({}, (error, result) => {
        console.log('error',error);
        console.log('result',result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message;
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "All Account List";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/************************** CoMPANY DETAIL BY ID ********************************************** */
router.get('/accountById', (request, response) => {

    let sentResponse = {};
    let accountId = request.query.accountId
    account.findOne({ _id: accountId }, (error, result) => {
        console.log('error',error);
        console.log('result',result);

        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Account Detail";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/******************************* DELETE BY ID *******************************/
router.delete('/delete',(request,response)=>{
    let accountId=request.query.accountId
    let sentResponse={}
    account.remove({_id:accountId},(error,result)=>{
        console.log('error',error);
        console.log('result',result);
        if (error) {
            sentresponse.error = true;
            sentresponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentresponse);
        }
        else {
            sentresponse.error = false;
            sentresponse.message = "Account Deleted";
            sentResponse.result = result
            response.status(200).json(sentresponse);

        }

    })
})
/************************************END ******************************************** */
/**************************** CREATION OF ACCOUNT TYPE ************************/
router.post('/accountType',(request,response)=>{
    let accountResponse = {};
    let accountTypeData = new accountType({
        accountType: request.body.accountType   
    });
    accountTypeData.save((error, result) => {
        console.log('account error', error);
        console.log('account result', result);
        if (error) {
            console.log(error);
            accountResponse.error = true;
            accountResponse.message = `Error :` ;
            response.status(500).json(accountResponse);
        } else {
            console.log(result);
            accountResponse.error = false;
            accountResponse.result = result;
            accountResponse.message = `Account Type  is Created  successfull.`;
            response.status(200).json(accountResponse);

        }

    });
})

/************************************END ******************************************** */
/************************** ACCOUNT LIST ********************************************** */
router.get('/accountType', (request, response) => {
    let sentResponse = {};
    accountType.find({}, (error, result) => {
        console.log('error',error);
        console.log('result',result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message;
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "All Account type List";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */


module.exports = router;