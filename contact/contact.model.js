const mongoose = require('mongoose');
var schema = mongoose.Schema;
const contactSchema = mongoose.Schema({

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
        enum: ['lalbaba', 'patro','mefy']
    },
    email: {
        type: String
    },
    company_name:{
        type:String
    },
    website:{
        type:String
    },
    bank_name: {
        type: String
    },

    branch_name: {
        type: String
    },
    account_holder_name: {
        type: String
    },
    ifsc: {
        type: String,
    },
    account_number: {
        type: String
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

contactSchema.pre('findOne', function (next) {
    this.populate('userId');
    next();
});
contactSchema.pre('find', function (next) {
    this.populate('userId');
    next();
});

const contact = module.exports = mongoose.model('contact', contactSchema)