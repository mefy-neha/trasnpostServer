const mongoose = require('mongoose');
var schema = mongoose.Schema;
const invoiceSchema = mongoose.Schema({
    customer: {
        type: schema.ObjectId,
        ref: 'customer'
    },
    invoice_number:{
        type:String
    },

    order_number: {
        type: String
    },
    invoice_date: {
        type: String
    },
    challan_doc: {
        type: schema.ObjectId,
        ref: 'file'
    },
    terms: {
        type: String,
    },
    due_date: {                      //id
        type: String
    },
    sub_total: {                            //id
        type: String
    },
    total: {
        type: String
    },
    truck_number: {
        type: String
    },
    origin_place: {
        type: String
    },
    destination: {
        type: String
    },
    authorize_person: {
        type: String               //id
    },
    driver_license_number: {
        type: String
    },
    driver_name: {
        type: String               //id
    },
    quantity:{
        gross_wt: {
            type: String
        },
        tare_wt: {
            type: String
        },
        net_wt: {
            type: String
        }
    },
    advance_payment:{
        diesel_expenses:{
            type: String,
           
        },
        driver_expenses:{
            type: String, 
        },
        toll_expenses:{
            type: String
        },
    },
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
    this.populate('customer');
    next();
});
invoiceSchema.pre('find', function (next) {
    this.populate('customer');
    next();
});
const invoice = module.exports = mongoose.model('invoice', invoiceSchema)