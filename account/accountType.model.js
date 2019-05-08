const mongoose = require('mongoose');
var schema = mongoose.Schema;
const accountTypeSchema = mongoose.Schema({

    accountType: {
        type: String,
        enum:['Asset','Liability','Expense','Revenue','Equity']
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

const accountType = module.exports = mongoose.model('accountType', accountTypeSchema)