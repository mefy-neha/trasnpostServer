const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var schema = mongoose.Schema;
const userSchema = mongoose.Schema({
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
userSchema.plugin(uniqueValidator);
const user = module.exports = mongoose.model('user', userSchema)