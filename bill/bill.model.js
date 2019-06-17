const mongoose = require('mongoose');
var schema = mongoose.Schema;
const billSchema = mongoose.Schema({

    vendorId: {
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
    bill_date: {
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
    notes: {
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
    tds:{
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
    discount:{
        type:String,
        enum:['INR','%']
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

billSchema.pre('findOne', function (next) {
    this.populate('userId');
    next();
});
billSchema.pre('find', function (next) {
    this.populate('userId');
    next();
});
billSchema.pre('findOne', function (next) {
    this.populate('contact');
    next();
});
billSchema.pre('find', function (next) {
    this.populate('contact');
    next();
});
const bill = module.exports = mongoose.model('bill', billSchema)