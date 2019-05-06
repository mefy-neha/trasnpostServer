const express = require('express');
const router = express.Router();
const account = require('./account.model');
const user = require('../user/user.model');



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


module.exports = router;