const mongoose = require('mongoose');
var schema = mongoose.Schema;
const payentSchema = mongoose.Schema({

    vendorId: {
        type: schema.ObjectId,
        ref: 'vendor'
    },
    invoice_number:{
        type:String
    },

    work_order: {
        type: String
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
    gst:{
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
        vehicle_number:{
            type: String     
        },
        invoice_number:{
            type: String  
        },
        serial_number:{
            type: String,
        },
        item:{
            type: String
        },
        date:{
            type: String
        },
        ship_to_party:{
            type: String
        },
        material:{
            type: String       
        },
        quantity:{
            type: String
        },
        shortage:{
            type: String
        },
        rtd_p:{
            type: String
        },
        rtd_h:{
            type: String
        },
        rtd_hh:{
            type: String
        },
        rate_p:{
            type: String
        },
        rate_h:{
            type: String       
        },
        rate_hh:{
            type: String
        },
        gross_amount:{
            type: String
        },
        penalty_amount:{
            type: String
        },
        igst:{
            type: String
        },
        cgst:{
            type: String
        },
        s_ugst:{
            type: String
        }
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

payentSchema.pre('findOne', function (next) {
    this.populate('userId');
    next();
});
payentSchema.pre('find', function (next) {
    this.populate('userId');
    next();
});
payentSchema.pre('findOne', function (next) {
    this.populate('vendorId');
    next();
});
payentSchema.pre('find', function (next) {
    this.populate('vendorId');
    next();
});
const payment = module.exports = mongoose.model('payment', payentSchema)