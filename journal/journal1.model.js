const mongoose = require('mongoose');
var schema = mongoose.Schema;
const journalSchema = mongoose.Schema({

date: {
    type: String
},
organisation:{
    type: String,
    enum: ['lalbaba', 'patro']
},
reference: {
    type: String,
},
status:{
    type: String
},
posted:{
    type:Boolean
},
period:{
    type: String,
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
userId: {
    type: schema.ObjectId,
    ref: 'user'
},
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
total_amount:{
    type: String, 
},
superAdminId: {
    type: String

},
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
    this.populate('accountName');
    next();
});
journalSchema.pre('find', function (next) {
    this.populate('accountName');
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
    this.populate('contactPerson');
    next();
});
journalSchema.pre('find', function (next) {
    this.populate('contactPerson');
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
const journal1 = module.exports = mongoose.model('journal1', journalSchema)