const mongoose = require('mongoose');
var schema = mongoose.Schema;
const journalSchema = mongoose.Schema({

date: {
    type: String
},

refrence: {
    type: String,
},
journalNumber:{
    type: Number
},
notes:{
    type: String,
   
},
currency: {
    type: String
},
journalType: {
    type: Boolean,
    enum: [true, false]
},
description:{
    type: String
},
userId: {
    type: schema.ObjectId,
    ref: 'user'
},
contactPersonId:{
    type: schema.ObjectId,
    ref: 'contact'
},
accountId:{
    type: schema.ObjectId,
    ref: 'account'                /***************ACCOUNT AGAINST BY WHICH PERSON ID */
},
companyId:{
    type: schema.ObjectId,
    ref: 'company'
},
debit:{
    type:String
},
credit:{
    type:String
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
const journal = module.exports = mongoose.model('journal', journalSchema)