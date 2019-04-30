const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var schema = mongoose.Schema;
const userSchema = mongoose.Schema({
name: {
    type: String
},
email: {
    type: String,
    unique: true,
    sparse: true
},

organisation:{
    type: String
},

password: {
    type: String
},
role: {
    type: String,
    enum: ['superAdmin', 'admin', 'accounts']
},
file:{
    type : Object
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