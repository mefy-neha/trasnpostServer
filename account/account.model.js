const mongoose = require('mongoose');
var schema = mongoose.Schema;
const accountSchema = mongoose.Schema({
accountType: {
    type: String,
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
userId: {
    type: schema.ObjectId,
    ref: 'user'
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
// enum:['Asset','Liability','Expense','Revenue','Equity']
const account = module.exports = mongoose.model('account', accountSchema)