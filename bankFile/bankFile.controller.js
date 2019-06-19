const express = require('express');
const router = express.Router();
const bankFile = require('./bankFile.model');
const user = require('../user/user.model');
const excel = require('node-excel-export');
const styles = {
    headerDark: {
      fill: {
        fgColor: {
          rgb: 'FF000000'
        }
      },
      font: {
        color: {
          rgb: 'FFFFFFFF'
        },
        sz: 14,
        bold: true,
        underline: true
      }
    },
    cellPink: {
      fill: {
        fgColor: {
          rgb: 'FFFFCCFF'
        }
      }
    },
    cellGreen: {
      fill: {
        fgColor: {
          rgb: 'FF00FF00'
        }
      }
    }
  };
  const heading = [
    [{value: 'a1', style: styles.headerDark}, {value: 'b1', style: styles.headerDark}, {value: 'c1', style: styles.headerDark}],
    ['a2', 'b2', 'c2'] // <-- It can be only values
  ];
  //Here you specify the export structure
  const merges = [
    { start: { row: 1, column: 1 }, end: { row: 1, column: 10 } },
    { start: { row: 2, column: 1 }, end: { row: 2, column: 5 } },
    { start: { row: 2, column: 6 }, end: { row: 2, column: 10 } }
  ]
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
        // console.log('result result', result);
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
router.get('/findById', (request, response) => {
    let sentResponse = {};
    let bankId=request.query.bankId
    bankFile.findOne({_id:bankId}, (error, result) => {
        console.log('error',error);
        // console.log('resultttt',result);
        const specification = {
          customer_name: { // <- the key should match the actual data key
            displayName:'account_holder_name', // <- Here you specify the column header
            headerStyle: styles.headerDark, // <- Header style
            // cellStyle: function(value, row) { // <- style renderer function
            //   // if the status is 1 then color in green else color in red
            //   // Notice how we use another cell value to style the current one
            //   return (row.status_id == 1) ? styles.cellGreen : {fill: {fgColor: {rgb: 'FFFF0000'}}}; // <- Inline cell style is possible 
            // },
            width: 120 // <- width in pixels
          },
          status_id: {
            displayName: 'ifsc',
            headerStyle: styles.headerDark,
            // cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
            //   return (value == 1) ? 'Active' : 'Inactive';
            // },
            width: '10' // <- width in chars (when the number is passed as string)
          },
          note: {
            displayName: 'account_number',
            headerStyle: styles.headerDark,
        //     cellStyle: styles.cellPink, // <- Cell style
        //     width: 220 // <- width in pixels
          },
          amount: {
            displayName: 'amount',
            headerStyle: styles.headerDark,
        //     cellStyle: styles.cellPink, // <- Cell style
        //     width: 220 // <- width in pixels
          }
          
        }
     
        if (error) {
            sentResponse.error = true;
            sentResponse.message = `Error :` + error.message;
            response.status(500).json(sentResponse);
        }
        else if(result) {
          console.log('result.file_data',result.file_data.length)
          let x=[]
          for(let i=0;i<result.file_data.length;i++){
            console.log('for loop')
          x.push({customer_name:result.file_data[i].account_holder_name,
            status_id: result.file_data[i].ifsc,
             note:result.file_data[i].account_number,
             amount:result.file_data[i].amount,
              misc: 'not shown'})
          
        }
        console.log('xxxx',x)
            // sentResponse.error = false;
            sentResponse.message = "ALL Bank File List";
            // sentResponse.result = result
            const report = excel.buildExport(
                // console.log('aa raha hai//')
        
                 [
                   {
                     name: 'Report', // <- Specify sheet name (optional)
                     heading: heading, // <- Raw heading array (optional)
                    //  merges: merges, // <- Merge cell ranges
                     specification: specification, // <- Report specification
                     data: x // <-- Report data
                   }
                  
                 ]
                 
               );
               // You can then return this straight
               response.attachment('report.xlsx'); // This is sails.js specific (in general you need to set headers)
               return response.status(200).send(report);
            // response.status(200).json(sentResponse);

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
/************************** BANK LIST ********************************************** */
router.get('/listt', (request, response) => {
    let sentResponse = {};
    
    const report = excel.buildExport(
        // console.log('aa raha hai//')

         [
           {
             name: 'Report', // <- Specify sheet name (optional)
             heading: heading, // <- Raw heading array (optional)
             merges: merges, // <- Merge cell ranges
             specification: specification, // <- Report specification
             data: dataset // <-- Report data
           }
         ]
       );
        console.log('aa raha hai')
       // You can then return this straight
       response.attachment('report.xlsx'); // This is sails.js specific (in general you need to set headers)
       return response.status(200).send(report);
    //    wb.write('ExcelFile.xlsx', res);
})
/************************************END ******************************************** */
module.exports = router;