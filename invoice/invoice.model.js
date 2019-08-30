const mongoose = require('mongoose');
var schema = mongoose.Schema;
const invoiceSchema = mongoose.Schema({

    customerId: {
        type: schema.ObjectId,
        ref: 'contact'
    },
    invoice_number:{
        type:String
    },

    work_order: {
        type: schema.ObjectId,
        ref: 'order'
    },
    invoice_date: {
        type: String
    },
    terms: {
        type: String,
    },
    due_date: {                      
        type: String
    },
    sub_total: {                            
        type: String
    },
    total: {
        type: String
    },
    amount_paid: {
        type: String
    },
    amount_due: {
        type: String
    },
    customer_notes: {
        type: String
    },
    terms_condition: {
        type: String
    },
    status: {
        type: String,
        enum:['paid','unpaid']
    },
    adjustment: {
        amount:{
        type: String
        }
    },
    sgst:{
        rate: {
            type: String
        },
        amount: {
            type: String
        }
     
    },
    cgst:{
        rate: {
            type: String
        },
        amount: {
            type: String
        }
     
    },
    igst:{
        rate: {
            type: String
        },
        amount: {
            type: String
        }
     
    },
    period:{
        start_date:{
            type:String
        },
        end_date:{
            type:String
        }
    },
    reverse_change:{
        type:String,
        enum:['yes','no']
    },
    items_details:[{

        cosignmentId:{
            type: schema.ObjectId,
            ref: 'consignment'
        },
        serial_number:{
            type: String,
        },  
        description:{
            type: String
        },
        amount:{
            type: String
        },
        deduction:{
            type: String  
        },
        departmental:{
            type: String  
        },
        tds:{
            type: String  
        },
        shortage:{
            type: String  
        },
        gst_tds:{
            type: String  
        },
     
        ccms:{
            type: String  
        },
        paymentDate:{
            type: String  
        },
        paid_amount: {
            type: String
        },
        due_amount: {
            type: String
        },
        amount_status: {
            type: String,
            enum:['complete','incomplete'],
            default:'incomplete'
        },
    }],
    userId: {
        type: schema.ObjectId,
        ref: 'user'
    },
    superAdminId: {
        type: String

    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    },
    enabled: {
        type: Number,
        default: 1
    }
})

invoiceSchema.pre('findOne', function (next) {
    this.populate('userId');
    next();
});
invoiceSchema.pre('find', function (next) {
    this.populate('userId');
    next();
});
invoiceSchema.pre('findOne', function (next) {
    this.populate('customerId');
    next();
});
invoiceSchema.pre('find', function (next) {
    this.populate('customerId');
    next();
});
const invoice = module.exports = mongoose.model('invoice', invoiceSchema)