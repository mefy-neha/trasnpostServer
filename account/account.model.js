const mongoose = require('mongoose');
var schema = mongoose.Schema;
const accountSchema = mongoose.Schema({
accountName: {
    type: String
},
accountType: {
    type: String,
},

description:{
    type: String,
   
},
accountCode: {
    type: String
},
subAccount: {
    type: Boolean,
},
// adminId:{
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
accountSchema.pre('findOne', function (next) {
    this.populate('userId');
    next();
});
accountSchema.pre('find', function (next) {
    this.populate('userId');
    next();
});
const account = module.exports = mongoose.model('account', accountSchema)