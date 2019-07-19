const express = require('express');
const encryptPassword = require('encrypt-password');
const router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'ploads/' });
var path = require('path');
var fs = require('fs');
var gm = require('gm').subClass({ imageMagick: true });
const user = require('./user.model');
var nodemailer = require('nodemailer');



/************************* ADMIN REGISTRATION *************************/
router.post('/Admincreate', (request, response) => {
    let registrationResponse = {};
    let data = new user({
        email: (request.body.email).toLowerCase(),
        name: request.body.name,
        password: encryptPassword(request.body.password),
        role: request.body.role,
        organisation: request.body.organisation,
        is_active:'active'
    });
    console.log(data);
    data.save((error, result) => {
        if (error) {
            console.log(error);
            registrationResponse.error = true;
            registrationResponse.message = `Error :` + error.code == 11000 ? error.message : " email already exist";
            response.status(500).json(registrationResponse);
        } else {
            console.log(result);
            registrationResponse.error = false;
            registrationResponse.user = result;
            registrationResponse.message = `Admin is created  successfull.`;
            response.status(200).json(registrationResponse);

        }

    });
})
/************************************END ******************************************** */

/************************* USER REGISTRATION *************************/
router.post('/userCreate', (request, response) => {
    let registrationResponse = {};
    let data = new user({
        email: (request.body.email).toLowerCase(),
        name: request.body.name,
        storePassword: encryptPassword(randomPassword(6)),
        password: randomPassword(6),
        role: request.body.role,
        organisation: request.body.organisation,
        superAdminId:request.body.superAdminId,
        is_active:'active'
    });
    console.log(data);
    data.save((error, result) => {
        console.log('user error', error);
        console.log('user result', result);

        if (error) {
            console.log(error);
            registrationResponse.error = true;
            registrationResponse.message = `Error :` + error.code == 11000 ? error.message : " email already exist";
            response.status(500).json(registrationResponse);
        } else {
            sendEmail(result.email, result.password);
        console.log('user result result', result.email,result.password);

            user.findOneAndUpdate({ email:result.email }, { password:encryptPassword(result.password) }, { new: true }, (err, res) => {
                console.log('err', err);
                console.log('resss', res) 
            // console.log(result);
            if(err){
                registrationResponse.err = true;
                registrationResponse.message = "Something Went wrong";
                response.status(500).json(registrationResponse);
            }
            else{
            registrationResponse.err = false;
            registrationResponse.user = res;
            registrationResponse.message = `User is created  successfull.`;
            response.status(200).json(registrationResponse);
            }
            })

        }

    });
})
/************************************END ******************************************** */

/***************************************************************** */
function randomPassword(length) {
    var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
    var pass = "";
    for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    return pass;
}
/******************************************************************* */


/************************************** LOGIN API ******************************** */

router.post('/login', (request, response) => {
    let password = encryptPassword(request.body.password);
    let email = (request.body.email).toLowerCase();
    let organisation = (request.body.organisation);
    console.log('password', password, email, organisation);
    let userLoginResponse = {};

    user.findOne({ $and: [{ email: email }, { organisation: organisation }] }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error || result === null) {
            userLoginResponse.error = true;
            userLoginResponse.message = "User does not exist";
            response.status(500).json(userLoginResponse);
        } else {
            console.log('result', result)
            if (result.password == password) {
                userLoginResponse.error = false;
                userLoginResponse.user = result;
                userLoginResponse.message = `User login successfully .`;
                response.status(200).json(userLoginResponse);
            } else {
                userLoginResponse.error = true;
                userLoginResponse.message = "Invalid Credentials";
                response.status(200).json(userLoginResponse);
            }
        }
    });
});

/************************************END ******************************************** */
/************************** USER LIST ********************************************** */
router.get('/list', (request, response) => {
    let sentResponse = {};
    user.find({}, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message;
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "User List";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/************************** USER DETAIL BY ID ********************************************** */
router.get('/userById', (request, response) => {
    let userId = request.query.userId;
    let sentResponse = {};
    user.findOne({ _id: userId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + "User Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "User Detail";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */
/******************************* DELETE BY ID(USERID) *******************************/
router.delete('/delete', (request, response) => {
    let userId = request.query.userId
    let sentResponse = {}
    user.remove({ _id: userId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = "User Deleted";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */

/**************************** NODEMAILER EMAIL SENT TO USER ***************************/
function sendEmail(email, password) {
    let sentresponse = {};
    var mailOptions, smtpTransporter;
    console.log("-----------------/email.........password---------------------------------", email, password);
    smtpTransporter = nodemailer.createTransport({
        tls: {
            rejectUnauthorized: false
        },
        // host: "smtp.ipage.com",
        service: 'gmail',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "viuh.mefy@gmail.com"  ,      
            pass: "Mefycare@12345" // generated ethereal password
        }
    });
    mailOptions = {
        from: '"Viuh 👻" <viuh.mefy@gmail.com>',
        to: email,
        subject: 'Welcome To VIUH ',
        html: '<h>Your login userId is  :</h>' + email + '</br><h>Your Password is: </h>' + password + '<p>Change your password BY logging.'
    };

    smtpTransporter.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log('errorr../////', error);
            sentresponse.error = true;
            sentresponse.message = 'Error:' + error.message;
            // response.status(500).json(sentresponse);
            // throw error;
        } else {
            console.log('Email sent: ' + info.response);
            sentresponse.error = false;
            sentresponse.message = "EMail sent successfully";
            sentresponse.result = info;
            response.status(200).json(sentresponse)
        }

    });
    return smtpTransporter, password;

}
/********************************* ENDS ***************************************** */
/********************************GET USERLIST BY SUPERADMIN ************************/
router.get('/userBySuperAdmin', (request, response) => {
    let superAdminId = request.query.superAdminId;
    let sentResponse = {};
    user.find({ superAdminId: superAdminId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + "User Does not exist";
            response.status(500).json(sentResponse);
        }
        else {
            sentResponse.error = false;
            sentResponse.message = " List of User Detail";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/********************************* ENDS ***************************************** */
/************************** STATUS CHANGED ************************************* */
router.put('/deactive',(request,response)=>{
    let userId=request.query.userId;
    let sentResponse = {};
    user.findByIdAndUpdate({_id:userId}, {$set:{ is_active:'deactive'}},{ new: true }).exec(function (error, result) {
        console.log('error',error);
        console.log('result',result)
    if(error){
    sentResponse.error = true;
    sentResponse.message = `Error :` + error.message + "User Does not exist";
    response.status(500).json(sentResponse);
}
else{
           sentResponse.error = false;
            sentResponse.message = "User deactive now";
            sentResponse.result = result
            response.status(200).json(sentResponse);
}

    })
})
/********************************* ENDS ***************************************** */

/************************** RESET PASSWORD ************************************************/
router.put('/resetPassword', (request, response) => {
    let resetPasswordResponse = {};
    let email = request.body.email;
    let password = encryptPassword(request.body.password);
    user.findOne({
        email: email
    }, (error, result) => {
        if (error || result === null) {
            resetPasswordResponse.error = true;
            resetPasswordResponse.message = "User does not exist";
            response.status(500).json(resetPasswordResponse);
        } else if (result.password == password) {
            console.log('old password', result.password, password)
            resetPasswordResponse.error = true;
            resetPasswordResponse.message = "old password is not valid,set new password";
            response.status(500).json(resetPasswordResponse);

        } else {
            user.findOneAndUpdate({email:email}, {
                password: password
            }, {
                    new: true
                })
                .then(res => console.log('find by id and update', res))
                .catch(error => console.log(error))
            return response.status(200).json({
                error: false,
                message: 'Password Reset Successfully'
            });

        }
    })

})
/************************************END ******************************************** */
/************************************ ACCOUNT UPDATE  IN INVOICE ******************************************** */
router.put('/update',(request,response)=>{
    let sentResponse = {};
    let userId = request.body.userId;
 
    // console.log('result.amount_paid',amount_paid)
    user.findById({ _id: userId }, (error, result) => {
        console.log('error', error)
        console.log('result', result)
        if (error ||result==null) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + " Does not exist";
            response.status(500).json(sentResponse);
        }
        else if (result){
//    
                result.email = (request.body.email ? (request.body.email).toLowerCase() : result.email);
                result.password = (request.body.password ? encryptPassword(request.body.password) : result.password);

                result.save((error, result) => {
                    console.log(' save error',error)
                    if (error) {
                        sentResponse.error = true;
                        sentResponse.message = `Error :` + error.message + " Not update";
                        response.status(500).json(sentResponse);
                    }
                    else {
                        sentResponse.error = false;
                        sentResponse.message = "User Updated";
                        sentResponse.result = result
                        response.status(200).json(sentResponse);

                    }
                })

    }
        
        
})
})
/************************************END ******************************************** */


module.exports = router;