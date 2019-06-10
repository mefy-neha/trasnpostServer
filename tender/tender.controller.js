const express = require('express');
const router = express.Router();
const tender = require('./tender.model');
const user = require('../user/user.model');
const company = require('../company/company.model');
const fleet = require('../fleet/fleet.model');


/************************************TENDER ******************************************** */
router.post('/tender', (request, response) => {
    let superAdminId = request.query.superAdminId;
    let gst=request.query.gst
    let road_registration_certificate=request.query.road_registration_certificate
    let sentResponse = {};
    let x=[]
    
    company.find({ superAdminId: superAdminId }, (error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + "User Does not exist";
            response.status(500).json(sentResponse);
        }
        else if(result) {
            if(gst=='gst'){
                x.push(result[0].gst)

            }
            if(road_registration_certificate=='road_registration_certificate'){
                x.push(result[0].road_registration_certificate)

            }
            if(road_registration_certificate=='road_registration_certificate'){
                x.push(result[0].road_registration_certificate)

            }
            if(road_registration_certificate=='road_registration_certificate'){
                x.push(result[0].road_registration_certificate)

            }
            if(road_registration_certificate=='road_registration_certificate'){
                x.push(result[0].road_registration_certificate)

            }
            if(road_registration_certificate=='road_registration_certificate'){
                x.push(result[0].road_registration_certificate)

            }
            if(road_registration_certificate=='road_registration_certificate'){
                x.push(result[0].road_registration_certificate)

            }
            console.log('xxxx',x)

           








            
            sentResponse.error = false;
            sentResponse.message = "Company List";
            sentResponse.result = result
            response.status(200).json(sentResponse);

        }

    })
})
/************************************END ******************************************** */


module.exports = router;