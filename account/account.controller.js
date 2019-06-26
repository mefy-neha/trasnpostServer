const express = require('express');
const router = express.Router();
const account = require('./account.model');
const user = require('../user/user.model');



/************************ ACCOUNT CREATION **************************/
router.post('/create', (request, response) => {
    let accountResponse = {};
    // console.log('requesssst', request.body)
    let data = new account({
        accountName: request.body.accountName,
        accountType: request.body.accountType,
        description: request.body.description,
        organisation: request.body.organisation,
        parentAccount: request.body.parentAccount ? request.body.parentAccount : null,
        userId: request.body.userId
    });
    user.findById({ _id: data.userId }, (error, result) => {
        console.log('user error', error);
        console.log('user result', result);
        if (error || result == null) {
            accountResponse.error = true;
            accountResponse.message = `Error :` + " User Does not exist";
            response.status(500).json(accountResponse);
        }
        else if (result) {
            switch (data.accountType) {
                case 'Asset':
                    console.log('data.accountType ', data.accountType)
                    account.find({ $and: [{ userId: data.userId }, { accountType: data.accountType }] }).exec(function (asserr, asset) {
                        console.log('asserr', asserr)
                        console.log('asset', asset)
                        if (asserr) {
                            accountResponse.error = true;
                            accountResponse.message = `Error :` + " Not found asset";
                            response.status(500).json(accountResponse);
                        }
                        else {
                            console.log('asset', asset.length)
                            let new_asset = {}
                            new_asset = asset.length + 1
                            data.accountCode = 'Ass-00' + new_asset
                            console.log('dataaa', data);
                            data.save((error, result) => {
                                console.log('error', error);
                                console.log('result', result);
                                if (error) {
                                    console.log(error);
                                    accountResponse.error = true;
                                    accountResponse.message = `Error :` + error.message + 'Account creation failed'
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
                    break;
                case 'Liability':
                    account.find({ $and: [{ userId: data.userId }, { accountType: data.accountType }] }, (liaberr, liability) => {
                        if (liaberr) {
                            accountResponse.error = true;
                            accountResponse.message = `Error :` + " Not found liability";
                            response.status(500).json(accountResponse);
                        }
                        else {
                            let new_liability = {}
                            new_liability = liability.length + 1
                            data.accountCode = 'Lib-00' + new_liability
                            console.log('dataaa', data);
                            data.save((error, result) => {
                                console.log('error', error);
                                console.log('result', result);
                                if (error) {
                                    console.log(error);
                                    accountResponse.error = true;
                                    accountResponse.message = `Error :` + error.message + 'Account creation failed'
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
                    break;
                case 'Expense':
                    account.find({ $and: [{ userId: data.userId }, { accountType: data.accountType }] }, (experr, expense) => {
                        if (experr) {
                            accountResponse.error = true;
                            accountResponse.message = `Error :` + " Not found experr";
                            response.status(500).json(accountResponse);
                        }
                        else {
                            let new_expenses = {}
                            new_expenses = expense.length + 1
                            data.accountCode = 'Exp-00' + new_expenses
                            console.log('dataaa', data);
                            data.save((error, result) => {
                                console.log('error', error);
                                console.log('result', result);
                                if (error) {
                                    console.log(error);
                                    accountResponse.error = true;
                                    accountResponse.message = `Error :` + error.message + 'Account creation failed'
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
                    break;
                case 'Revenue':
                    account.find({ $and: [{ userId: data.userId }, { accountType: data.accountType }] }, (reverr, revenue) => {
                        if (reverr) {
                            accountResponse.error = true;
                            accountResponse.message = `Error :` + " Not found revenue";
                            response.status(500).json(accountResponse);
                        }
                        else {
                            let new_revenue = {}
                            new_revenue = revenue.length + 1
                            data.accountCode = 'Rev-00' + new_revenue
                            console.log('dataaa', data);
                            data.save((error, result) => {
                                console.log('error', error);
                                console.log('result', result);
                                if (error) {
                                    console.log(error);
                                    accountResponse.error = true;
                                    accountResponse.message = `Error :` + error.message + 'Account creation failed'
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
                    break;
                case 'Equity':
                    account.find({ $and: [{ userId: data.userId }, { accountType: data.accountType }] }, (eqerr, equity) => {
                        if (eqerr) {
                            accountResponse.error = true;
                            accountResponse.message = `Error :` + " Not found liability";
                            response.status(500).json(accountResponse);
                        }
                        else {
                            let new_equity = {}
                            new_equity = equity.length + 1
                            data.accountCode = 'Equ-00' + new_equity
                            console.log('dataaa', data);
                            data.save((error, result) => {
                                console.log('error', error);
                                console.log('result', result);
                                if (error) {
                                    console.log(error);
                                    accountResponse.error = true;
                                    accountResponse.message = `Error :` + error.message + 'Account creation failed'
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
                    break;
            }
        }
        else {
            accountResponse.message = ` User Does not exist.`;
            response.status(200).json(accountResponse);


        }


    })
})
/************************************END ******************************************** */

/************************** ACCOUNT LIST ********************************************** */
router.get('/list', (request, response) => {
    let sentResponse = {};
    account.find({}).sort({ accountType: 1, parentAccount: 1 }).exec(function (error, result) {
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
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "Account Deleted";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/**************************** GET LIST  OF ACCOUNT ,WHOSE PARENT ACCOUNT IS NULL OR NOt ************************/
router.get('/accountType', (request, response) => {
    console.log('request')
    let accountResponse = {};
    let parentAccount = request.query.parentAccount ? request.query.parentAccount : null
    let accountType = request.query.accountType ? request.query.parentAccount : ''
    console.log('response', parentAccount, accountType)
    console.log('responseffghf', accountType)

    account.find({ parentAccount: parentAccount }).sort({ accountType: 1, accountName: 1 }).exec(function (error, result) {
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
/**************************** GET LIST  OF ACCOUNT ,WHOSE PARENT ACCOUNT IS NULL OR NOt ************************/
router.get('/accountByType', (request, response) => {
    console.log('request', request.body)
    let accountResponse = {};
    let parentAccount = request.query.parentAccount ? request.query.parentAccount : null
    let accountName = request.query.accountName
    // console.log('response',parentAccount,accountType)
    account.find({ $and: [{ parentAccount: parentAccount }, { accountName: accountName }] }).sort({ accountType: 1, accountName: 1 }).exec(function (error1, result1) {
        console.log('account error1', error1);
        console.log('account result1', result1);
        console.log('account result1', result1.length);
        if (error1) {
            // console.log(error);
            accountResponse.error1 = true;
            accountResponse.message = `Error :` + error1.message;;
            response.status(500).json(accountResponse);
        } else {
            let x = []
            for (let i = 0; i < result1.length; i++) {
                console.log('accountr length1', result1[i].accountName)
                x.push(result1[i].accountName)
            }
            console.log('push data', x);
            account.find({ parentAccount: x }).sort({ accountType: 1, accountName: 1 }).exec(function (error2, result2) {
                console.log('error3', error2);
                if (error1) {
                    accountResponse.error2 = true;
                    accountResponse.message = `Error :` + error2.message;;
                    response.status(500).json(accountResponse);
                } else {
                    let y = []
                    for (let i = 0; i < result2.length; i++) {
                        console.log('accountr length2', result2[i].accountName)
                        y.push(result2[i].accountName)
                    }

                    account.find({ parentAccount: y }).sort({ accountType: 1, accountName: 1 }).exec(function (error3, result3) {
                        console.log('error3', error3);
                        if (error3) {
                            accountResponse.error3 = true;
                            accountResponse.message = `Error :` + error3.message;;
                            response.status(500).json(accountResponse);
                        } else {
                            console.log('all results', result1, result2, result3)
                            accountResponse.error3 = false;
                            accountResponse.result1 = result1;
                            accountResponse.result2 = result2;
                            accountResponse.result3 = result3;
                            accountResponse.message = `list of account.`;
                            response.status(200).json(accountResponse);
                        }

                    })

                }
            })
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
/************************** ACCOUNT DETAIL BY ACCOUNT TYPE,PARENT ACCOUNT,ACCOUNT NAME ********************************************** */
router.get('/accountDetail', (request, response) => {
    let accountType = request.query.accountType;
    let parentAccount = request.query.parentAccount;
    let accountName = request.query.accountName;
    let sentResponse = {};
    account.find({ $and: [{ accountType: accountType }, { parentAccount: parentAccount },{ accountName: accountName }] }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + "Account Does not exist";
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