const mongoose = require('mongoose');
var schema = mongoose.Schema;
const paymentSchema = mongoose.Schema({

    contactId: {
        type: schema.ObjectId,
        ref: 'contact'
    },
    contractId: {
        type: schema.ObjectId,
        ref: 'contractor'
    },
    ownerId: {
        type: schema.ObjectId,
        ref: 'user'
    },
    payment_number:{
        type:String
    },

    fleetId: {
        type: schema.ObjectId,
        ref: 'fleet'
    },
    payment_date: {
        type: String   //advance payment date
    },
    payment_mode: {
        type: String,
        enum:['cash','cheque','bank']
    },
    payment:{
        type: String,
        enum:['diesel_price','toll_price','driver_expense','others']
    },
    amount_paid: {
        type: String   //amount 
    },
    bankId:{
        type: schema.ObjectId,
        ref: 'bank'
    },
    cheque_number:{
        type: String
    },
    denomination: [{
        type: {
            type: String
        },
        count: {
            type: String
        },
        amount: {
            type: String
        }
    }],
    userId: {
        type: schema.ObjectId,
        ref: 'user'
    },
    superAdminId: {
     type:String

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

paymentSchema.pre('findOne', function (next) {
    this.populate('userId');
    next();
});
paymentSchema.pre('find', function (next) {
    this.populate('userId');
    next();
});
paymentSchema.pre('findOne', function (next) {
    this.populate('vendorId');
    next();
});
paymentSchema.pre('find', function (next) {
    this.populate('vendorId');
    next();
});
paymentSchema.pre('findOne', function (next) {
    this.populate('contractId');
    next();
});
paymentSchema.pre('find', function (next) {
    this.populate('contractId');
    next();
});
paymentSchema.pre('findOne', function (next) {
    this.populate('ownerId');
    next();
});
paymentSchema.pre('find', function (next) {
    this.populate('ownerId');
    next();
});

const bill = module.exports = mongoose.model('payment', paymentSchema)