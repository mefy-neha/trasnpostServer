const mongoose = require('mongoose');
var schema = mongoose.Schema;
const driverSchema = mongoose.Schema({

    name: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    contactType: {
        type: String,
        default: 'driver'
    },
    organisation: {
        type: String,
        enum: ['lalbaba', 'patro']
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
        }
    },
    training_certificate: {
        number: {
            type: String
        },
        doc: {
            type: schema.ObjectId,
            ref: 'file'
        }
    },
    police_verification: {
        number: {
            type: String
        },
        doc: {
            type: schema.ObjectId,
            ref: 'file'
        }
    },
    picture: {
        type: schema.ObjectId,
        ref: 'file'
    },
    userId: {
        type: schema.ObjectId,
        ref: 'user'
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


const driver = module.exports = mongoose.model('driver', driverSchema)