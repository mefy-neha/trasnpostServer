const mongoose = require('mongoose');
var schema = mongoose.Schema;
// var uniqueValidator = require('mongoose-unique-validator');
const driverSchema = mongoose.Schema({

    name: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    contact_type: {
        type: String,
        enum: ['driver', 'vendor','customer','employee']
    },
    role:{
        type: String
    },
    organisation: {
        type: String,
        enum: ['lalbaba', 'patro']
    },
    email: {
        type: String,
        // unique: true,
        // sparse: true
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
    licence: {
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
    training_certificate: {
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
    police_verification: {
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
    voterId:{
        number: {
            type: String
        },
        doc: {
            type: schema.ObjectId,
            ref: 'file'
        }
    },
    picture: {
        type: String
    },
    userId: {
        type: schema.ObjectId,
        ref: 'user'
    },
    others: [{
        doc_name: {
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

driverSchema.pre('findOne', function (next) {
    this.populate('userId');
    next();
});
driverSchema.pre('find', function (next) {
    this.populate('userId');
    next();
});

// driverSchema.plugin(uniqueValidator);
const driver = module.exports = mongoose.model('driver', driverSchema)