const mongoose = require('mongoose');
var schema = mongoose.Schema;
const journalSchema = mongoose.Schema({

date: {
    type: String
},

reference: {
    type: String,
},
organisation:{
    type: String,
    enum: ['lalbaba', 'patro']
},
status:{
    type: String,
    default: 'publish'
},
posted:{
    type:Boolean
},
period:{
    type: String,
},
journalNumber:{
    type: Number
},
notes:{
    type: String,
   
},
total:{
    type: String, 
},
currency: {
    type: String,
    default:'INR'
},
// description:{
//     type: String
// },
denomination: [{
    type: {
        type: String
    },
    count: {
        type: String
    },
    amount: {
        type: String
    }
}],
detail:[{
    contactPersonId:{
        type: schema.ObjectId,
        ref: 'contact'
    },
    accountId:{
        type: schema.ObjectId,
        ref: 'account'                /***************ACCOUNT AGAINST BY WHICH PERSON ID */
    },
    debit:{
        type:String
    },
    credit:{
        type:String
    },
    description:{
        type: String
    }
}],
total_amount:{
    type: String,         //for total of denomination amount
},
userId: {
    type: schema.ObjectId,
    ref: 'user'
},
// contactPersonId:{
//     type: schema.ObjectId,
//     ref: 'contact'
// },
// accountId:{
//     type: schema.ObjectId,
//     ref: 'account'                /***************ACCOUNT AGAINST BY WHICH PERSON ID */
// },
superAdminId: {
    type: String

},
// debit:{
//     type:String
// },
// credit:{
//     type:String
// },
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
journalSchema.pre('findOne', function (next) {
    this.populate('accountId');
    next();
});
journalSchema.pre('find', function (next) {
    this.populate('accountId');
    next();
});
journalSchema.pre('findOne', function (next) {
    this.populate('UserId');
    next();
});
journalSchema.pre('find', function (next) {
    this.populate('userId');
    next();
});
journalSchema.pre('findOne', function (next) {
    this.populate('contactPersonId');
    next();
});
journalSchema.pre('find', function (next) {
    this.populate('contactPersonId');
    next();
});
journalSchema.pre('findOne', function (next) {
    this.populate('companyId');
    next();
});
journalSchema.pre('find', function (next) {
    this.populate('companyId');
    next();
});
const journal = module.exports = mongoose.model('journal', journalSchema)