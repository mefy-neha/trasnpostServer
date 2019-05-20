const express = require('express');
const router = express.Router();
const account = require('./account.model');
const user = require('../user/user.model');



/************************ ACCOUNT CREATION **************************/
router.post('/create', (request, response) => {
    let accountResponse = {};
    console.log('requesssst',request.body)
    let data = new account({
        accountName: request.body.accountName,  
        accountType:request.body.accountType,  
        description: request.body.description,
        accountCode: request.body.accountCode,
        organisation: request.body.organisation,
        parentAccount: request.body.parentAccount?request.body.parentAccount:null,   
        userId: request.body.userId
    });
    // console.log('dataaa',data);
    user.findById({ _id: data.userId }, (error, result) => {
        console.log('user error', error);
        // console.log('user result', result);
        if (error || result == null) {
            accountResponse.error = true;
            accountResponse.message = `Error :` + " User Does not exist";
            response.status(500).json(accountResponse);
        }
        else {
            data.save((error, result) => {
                console.log('error', error);
                console.log('result', result);
                if (error) {
                    console.log(error);
                    accountResponse.error = true;
                    accountResponse.message = `Error :` + error.message+'Account creation failed'
                    response.status(500).json(accountResponse);
                } else {
                    console.log(result);
                    accountResponse.error = false;
                    accountResponse.user = result;
                    accountResponse.message = `Account Created  successfull.`;
                    response.status(200).json(accountResponse);
        
                }
        
            });
             
                   
        }

   
    })
})
/************************************END ******************************************** */

/************************** ACCOUNT LIST ********************************************** */
router.get('/list', (request, response) => {
    let sentResponse = {};
    account.find({}, (error, result) => {
        console.log('error', error);
        console.log('result', result);
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
/************************** ACCOUNT DETAIL BY ID ********************************************** */
router.get('/accountById', (request, response) => {

    let sentResponse = {};
    let accountId = request.query.accountId
    account.findOne({ _id: accountId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);

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
router.delete('/delete', (request, response) => {
    let accountId = request.query.accountId
    let sentResponse = {}
    account.remove({ _id: accountId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
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
/**************************** GET LIST  OF ACCOUNT ,WHOSE PARENT ACCOUNT IS NULL OR NOt ************************/
router.get('/accountType', (request, response) => {
    console.log('request',)
    let accountResponse = {};
    let parentAccount =request.query.parentAccount?request.query.parentAccount:null 
    let accountType = request.query.accountType?request.query.parentAccount:''
    console.log('response',parentAccount,accountType)
    console.log('responseffghf',accountType)

        account.find({parentAccount:parentAccount}).sort({accountType:1,accountName:1}).exec(function(error,result){ 
        console.log('account error', error);
        console.log('account result', result);
        if (error) {
            console.log(error);
            accountResponse.error = true;
            accountResponse.message = `Error :` + error.message;;
            response.status(500).json(accountResponse);
        } else {
            console.log(result);
            accountResponse.error = false;
            accountResponse.result = result;
            accountResponse.message = `list of account.`;accountType:1,
            response.status(200).json(accountResponse);

        }
    })
    

    });
    


/************************************END ******************************************** */
/**************************** GET LIST  OF ACCOUNT ,WHOSE PARENT ACCOUNT IS NULL OR NOt ************************/
router.get('/accountByType', (request, response) => {
    console.log('request',)
    let accountResponse = {};
    let parentAccount =request.query.parentAccount?request.query.parentAccount:null 
    let accountType = request.query.accountType
    console.log('response',parentAccount,accountType)
        account.find({ $and: [{parentAccount:parentAccount},{accountType:accountType}]}).sort({accountType:1,accountName:1}).exec(function(error,result){ 
        console.log('account error', error);
        console.log('account result', result);
        if (error) {
            console.log(error);
            accountResponse.error = true;
            accountResponse.message = `Error :` + error.message;;
            response.status(500).json(accountResponse);
        } else {
            console.log(result);
            accountResponse.error = false;
            accountResponse.result = result;
            accountResponse.message = `list of account.`;
            response.status(200).json(accountResponse);

        }
    })
    

    });
    


/************************************END ******************************************** */


/************************** ACCOUNT DETAIL BY USERID ********************************************** */
router.get('/accountByUserId', (request, response) => {
    let userId = request.query.userId;
    let sentResponse = {};
    account.find({ userId: userId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + "User Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Account List";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
         
module.exports = router;