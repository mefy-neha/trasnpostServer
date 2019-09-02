const express = require('express');
const router = express.Router();
const paid = require('./consignmentPayment.model');
/************************************ PAID CREATION ******************************************** */
router.post('/create', (request, response) => {
    let invoiceResponse = {};
    let data = new paid({
        items_details:request.body.items_details
    })
    console.log('data',data)
    data.save((error, result) => {
        console.log('Invoice error', error);
        console.log('Invoice result', result);
        if (error) {
            console.log(error);
            invoiceResponse.error = true;
            invoiceResponse.message = `Error :` + " creation failed";
            response.status(500).json(invoiceResponse);
        } else {

            invoiceResponse.error = false;
            invoiceResponse.result = result;
            invoiceResponse.message = `Invoice is created  successfull.`;
            response.status(200).json(invoiceResponse);
        }
    })
})












module.exports = router;