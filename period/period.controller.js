const express = require('express');
const router = express.Router();
const period = require('./period.model');
const user = require('../user/user.model');

/************************************PERIOD CREATION ******************************************** */


router.post('/create', (request, response) => {
    let periodResponse = {};
    let data = new period({
        period_name: request.body.period_name,
        period_status: request.body.period_status,
        from: request.body.from,
        to: request.body.to,
        userId: request.body.userId
    })
    console.log('dataaaa', data)
    user.findById({ _id: data.userId }, (error, result) => {
        console.log('user error', error);
        console.log('user result', result);
        if (error || result == null) {
            console.log(error);
            periodResponse.error = true;
            periodResponse.message = `Error :` + " User does not exist";
            response.status(500).json(periodResponse);
        }
        else {
            data.save((error, result) => {
                console.log('period error', error);
                console.log('period result', result);
                if (error || result == null) {
                    periodResponse.error = true;
                    periodResponse.message = `Error :` + "Creation failed";
                    response.status(500).json(periodResponse);
                }
                else {
                    periodResponse.error = false;
                    periodResponse.result = result;
                    periodResponse.message = `Period is created  successfull.`;
                    response.status(200).json(periodResponse);

                }

            })
        }

    })

})


/*trial*/

// router.post('/create', (request, response) => {
//     period.findOne({period_status:'open'},(err,res)=>{
//         console.log(rs,err)
//     })
//     let data = new period({
//         status:request.body.status?request.body.status:null,
//         period:rs.period_name,
//         posted:false
// })






/************************************END ******************************************** */
module.exports = router;