const mongoose = require('mongoose');
var schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

const customerSchema = mongoose.Schema({

    name: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    contactType:{
        type: String,
        default:'customer'
    },
    organisation: {
        type: String,
        enum: ['lalbaba', 'patro']
    },
    email: {
        type: String,
        unique: true,
        sparse: true
    },
    company_name:{
        type:String
    },
    website:{
        type:String
    },
    aadhar: {
        number: {
            type: String
        },
        doc: {
            type: schema.ObjectId,
            ref: 'file'
        }
    },
    gst: {
        number: {
            type: String
        },
        doc: {
            type: schema.ObjectId,
            ref: 'file'
        }
    },
    pan: {
        number: {
            type: String
        },
        doc: {
            type: schema.ObjectId,
            ref: 'file'
        }
    },
    tan: {
        number: {
            type: String
        },
        doc: {
            type: schema.ObjectId,
            ref: 'file'
        }
    },
    others: [{
        name: {
            type: String
        },
        number: {
            type: String
        },
        doc: {
            type: schema.ObjectId,
            ref: 'file'

        },
        // valid_upto: {
        //     type: String
        // }
    }],
    picture: {
        type: schema.ObjectId,
        ref: 'file'
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

customerSchema.pre('findOne', function (next) {
    this.populate('userId');
    next();
});
customerSchema.pre('find', function (next) {
    this.populate('userId');
    next();
});

customerSchema.plugin(uniqueValidator);

const customer = module.exports = mongoose.model('customer', customerSchema)