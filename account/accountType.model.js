const mongoose = require('mongoose');
var schema = mongoose.Schema;
const accountTypeSchema = mongoose.Schema({

    // type: {
    //     type: String,
    //     enum:['Asset','Liability','Expense','Revenue','Equity']
    // },
    organisation:{
        type: String,
        enum: ['lalbaba', 'patro']
    },
    superAdminId:{
        type: schema.ObjectId,
        ref: 'user'
    },
    Asset:[],

    Liability:[],

    Expense:[],

    Revenue:[],

    Equity:[],
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
accountTypeSchema.pre('findOne', function (next) {
    this.populate('superAdminId');
    next();
});
accountTypeSchema.pre('find', function (next) {
    this.populate('superAdminId');
    next();
});
const accountType = module.exports = mongoose.model('accountType', accountTypeSchema)