const mongoose = require('mongoose');
var schema = mongoose.Schema;
const accountSchema = mongoose.Schema({
accountType: {
    type: String,
    enum:['Asset','Liability','Expense','Revenue','Equity']
},
accountName:{
    type: String,    
},

description:{
    type: String,
   
},
accountCode: {
    type: String
},
parentAccount:{
    type: String
},
super_parent_Account:{
    type: String
},
userId: {
    type: schema.ObjectId,
    ref: 'user'
},

superAdminId: {
    type: schema.ObjectId,
    ref: 'user'
},

organisation:{
    type:String,
    enum: ['lalbaba', 'patro','mefy']
},
referal_fleet: {
    type: schema.ObjectId,
    ref: 'contact'
},
referal_contractor: {
    type: schema.ObjectId,
    ref: 'contractor'
},
referal_bank: {
    type: schema.ObjectId,
    ref: 'bank'
},
referal_contact: {
    type: schema.ObjectId,
    ref: 'contact'
},
opening_account:{
    type:String                  // amount    
},
type:{
    type:String,
   enum:['credit','debit']
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
accountSchema.pre('findOne', function (next) {
    this.populate('referal_contractor');
    next();
});
accountSchema.pre('find', function (next) {
    this.populate('referal_contractor');
    next();
});
accountSchema.pre('findOne', function (next) {
    this.populate('referal_fleet');
    next();
});
accountSchema.pre('find', function (next) {
    this.populate('referal_fleet');
    next();
});
accountSchema.pre('findOne', function (next) {
    this.populate('referal_bank');
    next();
});
accountSchema.pre('find', function (next) {
    this.populate('referal_bank');
    next();
});
accountSchema.pre('findOne', function (next) {
    this.populate('referal_contact');
    next();
});
accountSchema.pre('find', function (next) {
    this.populate('referal_contact');
    next();
});
// accountSchema.pre('findOne', function (next) {
//     this.populate('userId');
//     next();
// });
// accountSchema.pre('find', function (next) {
//     this.populate('userId');
//     next();
// });
// enum:['Asset','Liability','Expense','Revenue','Equity']
const account = module.exports = mongoose.model('account', accountSchema)