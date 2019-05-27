const mongoose = require('mongoose');
var schema = mongoose.Schema;
const bankSchema = mongoose.Schema({
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
    accountType: {
        type: String,
        enum: ['saving', 'current']
    },
    account_number: {
        type: String
    },
    address: {
        type: String
    },
    format:[{
        field_name: {
            type: String
        },
        field_type: {
            type: String
        },
        description: {
            type: String
        }
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

bankSchema.pre('findOne', function (next) {
    this.populate('userId');
    next();
});
bankSchema.pre('find', function (next) {
    this.populate('userId');
    next();
});

const bank = module.exports = mongoose.model('bank', bankSchema)