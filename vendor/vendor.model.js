const mongoose = require('mongoose');
var schema = mongoose.Schema;
const vendorSchema = mongoose.Schema({
    name: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    contactType:{
        type: String,
        default:'vendor'
    },
    role:{
        type: String
    },
    organisation: {
        type: String,
        enum: ['lalbaba', 'patro']
    },
    // email: {
    //     type: String,
    //     unique: true,
    //     sparse: true
    // },
    // company_name:{
    //     type:String
    // },
    // website:{
    //     type:String
    // },
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
        },
        valid_upto: {
            type: String
        }
    },
    pan: {
        number: {
            type: String
        },
        doc: {
            type: schema.ObjectId,
            ref: 'file'
        },
        valid_upto: {
            type: String
        }
    },
    tan: {
        number: {
            type: String
        },
        doc: {
            type: schema.ObjectId,
            ref: 'file'
        },
        valid_upto: {
            type: String
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
        valid_upto: {
            type: String
        }
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



vendorSchema.pre('findOne', function (next) {
    this.populate('userId');
    next();
});
vendorSchema.pre('find', function (next) {
    this.populate('userId');
    next();
});


const vendor = module.exports = mongoose.model('vendor', vendorSchema)