const mongoose = require('mongoose');
var schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const companySchema = mongoose.Schema({

    companyName: {
        type: String
    },
    regId: {
        type: schema.ObjectId,
        ref: 'file'
    },
    regNo: {
        type: String,
    },
    gstNo: {
        type: String
    },
    gstId: {
        type: schema.ObjectId,
        ref: 'file'
    },
    tradeLicenseNo: {
        type: String
    },
    tradeLicenseId: {
        type: schema.ObjectId,
        ref: 'file'
    },
    invoiceNo: {
        type: String

    },
    invoiceId: {
        type: schema.ObjectId,
        ref: 'file'

    },
    panId: {
        type: schema.ObjectId,
        ref: 'file'
    },
    panCard: {
        type: String
    },
    address: {
        type: String
    },
    companyLogo: {
        type: schema.ObjectId,
        ref: 'file'
    },
    currency: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        sparse: true
    },
    userId: {
        type: schema.ObjectId,
        ref: 'user'
    },
    superAdminId: {
        type: schema.ObjectId,
        ref: 'user'
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

companySchema.pre('findOne', function (next) {
    this.populate('userId');
    next();
});
companySchema.pre('find', function (next) {
    this.populate('userId');
    next();
});


companySchema.plugin(uniqueValidator);
const company = module.exports = mongoose.model('company', companySchema)