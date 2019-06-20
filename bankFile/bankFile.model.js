const mongoose = require('mongoose');
var schema = mongoose.Schema;
const bankFileSchema = mongoose.Schema({

    file_data: [{

        personId: {
            type: String    //id of contact or contractor(person)
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
        amount: {
            type: String
        },
        seq: {
            type: String
        },
        transaction_type: {
            default:'NEFT TRANSFER'
        },
        sender_to_rcvr_info: {
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

bankFileSchema.pre('findOne', function (next) {
    this.populate('userId');
    next();
});
bankFileSchema.pre('find', function (next) {
    this.populate('userId');
    next();
});

const bankFile = module.exports = mongoose.model('bankFile', bankFileSchema)