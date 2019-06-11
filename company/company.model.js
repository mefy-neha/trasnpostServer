const mongoose = require('mongoose');
var schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const companySchema = mongoose.Schema({

    organisation: {
        type: String,
        enum: ['lalbaba', 'patro']
    },
    invoice_number:{
        type: String, 
    },
    road_registration_certificate: {
        doc: {
            type: schema.ObjectId,
            ref: 'file'
        }, number: {
            type: String,
        },
    },
    msme: {
        doc: {
            type: schema.ObjectId,
            ref: 'file'
        }, number: {
            type: String,
        },
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
    tradeLicense_A: {
        number: {
            type: String
        },
        doc: {
            type: schema.ObjectId,
            ref: 'file'
        },
    },
    tradeLicense_B: {
        number: {
            type: String
        },
        doc: {
            type: schema.ObjectId,
            ref: 'file'
        },
    },
    registration_certificate: {
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
tan:{
    number: {
        type: String
    },
    doc: {
        type: schema.ObjectId,
        ref: 'file'
    }
},
balance_sheet:[{
    financial_year: {
        type: String
    },
    doc: {
        type: schema.ObjectId,
        ref: 'file'
    }
}],
professional_tax:{
    number: {
        type: String
    },
    doc: {
        type: schema.ObjectId,
        ref: 'file'
    }
},
pf:{
    number: {
        type: String
    },
    doc: {
        type: schema.ObjectId,
        ref: 'file'
    }
},
esi:{
    number: {
        type: String
    },
    doc: {
        type: schema.ObjectId,
        ref: 'file'
    }
},
itr:[{
    financial_year: {
        type: String
    },
    doc: {
        type: schema.ObjectId,
        ref: 'file'
    }
}],
    address: {
        type: String
    },
    companyLogo: {
        type: schema.ObjectId,
        ref: 'file'
    },
    currency: {
        type: String,
        default:'INR'
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
        type: String
        
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