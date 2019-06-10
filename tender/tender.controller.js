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
    let tradeLicense_A=request.query.tradeLicense_A
    let tradeLicense_B=request.query.tradeLicense_B
    let invoice=request.query.invoice
    let pan=request.query.pan
    let tan=request.query.tan
    let professional_tax=request.query.professional_tax
    let pf=request.query.pf
    let esi=request.query.esi
    let balance_sheet=request.query.balance_sheet
    let itr=request.query.itr
    let fleetArray=request.body.fleetArray
    console.log('fleetArray',fleetArray)


    let sentResponse = {};
    let x=[]  
    company.find({ superAdminId: superAdminId }, (error, result) => {
        console.log('error', error);
        // console.log('result', result);
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message + "User Does not exist";
            response.status(500).json(sentResponse);
        }
        else if(result) {
            if(gst=='gst'){
                x.push({gst:result[0].gst})

            }
     
            if(road_registration_certificate=='road_registration_certificate'){
                x.push({road_registration_certificate:result[0].road_registration_certificate})

            }
            if(tradeLicense_A=='tradeLicense_A'){
                x.push({tradeLicense_A:result[0].tradeLicense_A})

            }
            if(tradeLicense_B=='tradeLicense_B'){
                x.push({tradeLicense_B:result[0].tradeLicense_B})

            }
            if(invoice=='invoice'){
                x.push(invoice[0].invoice)

            }
            if(pan=='pan'){
                x.push({pan:result[0].pan})

            }
            if(tan=='tan'){
                x.push({tan:result[0].tan})

            }
            if(pf=='pf'){
                x.push({pf:result[0].pf})

            }
            if(professional_tax=='professional_tax'){
                x.push({professional_tax:result[0].professional_tax})

            }
            if(esi=='esi'){
                x.push({esi:result[0].esi})

            }
            if(itr=='itr'){
                x.push({itr:result[0].itr})

            }
            if(balance_sheet=='balance_sheet'){
                x.push({balance_sheet:result[0].balance_sheet})

            }   
            else{
                let y=[]
                for(let i=0;i<fleetArray.length;i++){
                
                    console.log('fleetArray[i].fleetId',fleetArray[i].fleetId)
                fleet.findOne({ _id: fleetArray[i].fleetId }, (error, result) => {             
                    if (error) {
                        sentResponse.error = true;
                        sentResponse.message = `Error :` + error.message + "User Does not exist";
                        response.status(500).json(sentResponse);
                    }
                    else if(result){
                        // console.log('result fleet',result[i])
                        if(fleetArray[i].truck_number=='truck_number'||fleetArray[i].rc=='rc'||fleetArray[i].fitness=='fitness'||fleetArray[i].hydro_testing=='hydro_testing'){
                            // console.log('truck_number',fleetArray[i].truck_number)
                            // console.log('truck_number result',result.truck_number)
                            y.push({truck_number:result.truck_number,rc:result.rc,fitness:result.fitness,userId:result.userId,ownership:result.ownership,fleetId:result._id})
                         console.log('yyyyy',y)
            
                        }  
                    
                    }        
                
        })
                }
        console.log('yyyyy',y)
    sentResponse.error = false;
    sentResponse.message = "Company List";
    sentResponse.result = x
    response.status(200).json(sentResponse);
    }
        }
     else if (error == null && result == null) {
        sentresponse.error = true;
        sentresponse.message = 'Error::' + "Id doesn't exists";
        response.status(404).json(sentresponse);
    }

    })
})
/************************************END ******************************************** */
function datetapped(fleetArray) {
    let datearray = [];
    return new Promise((resolve, reject) => {
        fleetArray.forEach(element => {                  //filter list according to current date
            datearray.push(element.fl)
        })
        resolve(datearray)
    })
}

module.exports = router;