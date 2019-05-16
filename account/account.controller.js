const express = require('express');
const router = express.Router();
const account = require('./account.model');
const user = require('../user/user.model');
const accountType = require('./accountType.model')



/************************ ACCOUNT CREATION **************************/

router.post('/create', (request, response) => {
    let accountResponse = {};
    console.log('requesssst',request.body)
    let data = new account({
        accountName: request.body.accountName,  //
        accountType:request.body.accountType,
        name:request.body.name,
        description: request.body.description,
        accountCode: request.body.accountCode,
        organisation: request.body.organisation,
        subAccount: true,
        // accountAgainst: request.body.accountAgainst,
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
            console.log(result);
                            accountResponse.error = false;
                            accountResponse.user = result;
                            accountResponse.message = `Account Creation is  successfull.`;
                            response.status(200).json(accountResponse);
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
/************************** CoMPANY DETAIL BY ID ********************************************** */
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
/**************************** CREATION OF ACCOUNT TYPE ************************/
router.post('/accountType', (request, response) => {
    let accountResponse = {};
    console.log('account request', request);
    let accountTypeData = new accountType({
        superAdminId:request.body.superAdminId
    });
    accountTypeData.save((error, result) => {
        console.log('account error', error);
        console.log('account result', result);
        if (error) {
            console.log(error);
            accountResponse.error = true;
            accountResponse.message = `Error :`;
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
   let superAdminId=request.query.superAdminId
    accountType.findOne({superAdminId:superAdminId}, (error, result) => {
        console.log('error', error);
        console.log('result', result);
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
router.put('/add',(request,response)=>{
    let accountTypes=request.body.accountType;
    let accountName=request.body.accountName
    let superAdminId=request.body.superAdminId
    let sentResponse = {};
    let accountResponse = {};
// console.log(request.body)

accountType.findOne({superAdminId:superAdminId}, (error, result) => {
    console.log('error', error);
    console.log('result', result);
    if (error) {
        sentResponse.error = true;
        sentResponse.message = `Error :` + error.message;
        response.status(500).json(sentResponse);
    }
    else {
            // console.log('heyyy')
            switch(accountTypes){
                case 'Asset':
                accountType.findOneAndUpdate({ superAdminId: superAdminId }, { $push: { Asset: accountName} }, { upsert: false, multi: true }).exec(function (error, result) {
                    console.log('ress', result)
                    console.log('errr', error) 
                   
                    if (error) {
                        console.log(error);
                        accountResponse.error = true;
                        accountResponse.message = `Error :`;+'Account type does not exist'
                        response.status(500).json(accountResponse);
                    }
                    else{
                        accountResponse.error = false;
                        // accountResponse.result = result;
                        accountResponse.message = `Sub Account Added.`;
                        response.status(200).json(accountResponse);
                    }
                })
                break;
                case 'Liability':
                accountType.findOneAndUpdate({ superAdminId: superAdminId }, { $push: { Liability: accountName} }, { upsert: false, multi: true }).exec(function (error, result) {
                    console.log('ress', result)
                    console.log('errr', error)
                    let accountResponse = {};
                    if (error) {
                        console.log(error);
                        accountResponse.error = true;
                        accountResponse.message = `Error :`;+'Account type does not exist'
                        response.status(500).json(accountResponse);
                    }
                    else{
                        accountResponse.error = false;
                        // accountResponse.result = result;
                        accountResponse.message = `Sub Account Added.`;
                        response.status(200).json(accountResponse);
                    }
                })
                break;
                case 'Expense':
                accountType.findOneAndUpdate({ superAdminId: superAdminId }, { $push: { Expense: accountName} }, { upsert: false, multi: true }).exec(function (error, result) {
                    console.log('ress', result)
                    console.log('errr', error)
                    let accountResponse = {};
                    if (error) {
                        console.log(error);
                        accountResponse.error = true;
                        accountResponse.message = `Error :`;+'Account type does not exist'
                        response.status(500).json(accountResponse);
                    }
                    else{
                        accountResponse.error = false;
                        // accountResponse.result = result;
                        accountResponse.message = `Sub Account Added.`;
                        response.status(200).json(accountResponse);
                    }
                })
                break;
                case 'Revenue':
                accountType.findOneAndUpdate({ superAdminId: superAdminId }, { $push: { Revenue: accountName} }, { upsert: false, multi: true }).exec(function (error, result) {
                    console.log('ress', result)
                    console.log('errr', error)
                    let accountResponse = {};
                    if (error) {
                        console.log(error);
                        accountResponse.error = true;
                        accountResponse.message = `Error :`;+'Account type does not exist'
                        response.status(500).json(accountResponse);
                    }
                    else{
                        accountResponse.error = false;
                        // accountResponse.result = result;
                        accountResponse.message = `Sub Account Added.`;
                        response.status(200).json(accountResponse);
                    }
                })
                break;
                case 'Equity':
                accountType.findOneAndUpdate({ superAdminId: superAdminId }, { $push: { Equity: accountName} }, { upsert: false, multi: true }).exec(function (error, result) {
                    console.log('ress', result)
                    console.log('errr', error)
                    let accountResponse = {};
                    if (error) {
                        console.log(error);
                        accountResponse.error = true;
                        accountResponse.message = `Error :`;+'Account type does not exist'
                        response.status(500).json(accountResponse);
                    }
                    else{
                        accountResponse.error = false;
                        // accountResponse.result = result;
                        accountResponse.message = `Sub Account Added.`;
                        response.status(200).json(accountResponse);
                    }
                })
                break;

            }
        }
})


})
module.exports = router;