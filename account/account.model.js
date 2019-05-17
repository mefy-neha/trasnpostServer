const mongoose = require('mongoose');
var schema = mongoose.Schema;
const accountSchema = mongoose.Schema({
accountType: {
    type: String,
},
accountName:{
    type: String,    
},
name: {
    type: String,
},

description:{
    type: String,
   
},
accountCode: {
    type: String
},
childAccount: {
    type: Boolean,
    enum: [true, false]
},
subAccount:[{
    accountType:String,
    subAccount:String,
    account:String
   }],
// superAdminId:{
//     type: schema.ObjectId,
//     ref: 'user'
// },
userId: {
    type: schema.ObjectId,
    ref: 'user'
},
accountAgainst:{
    type:String                 /***************ACCOUNT AGAINST BY WHICH PERSON ID */
},
organisation:{
    type:String,
    enum: ['lalbaba', 'patro']
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
    this.populate('userId');
    next();
});
accountSchema.pre('find', function (next) {
    this.populate('userId');
    next();
});
const account = module.exports = mongoose.model('account', accountSchema)