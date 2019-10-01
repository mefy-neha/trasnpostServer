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
otp:{
    type: String, 
},
superAdminId:{
    type: schema.ObjectId,
    ref: 'user'
},
is_active:{
    type:String,
    enum: ['active', 'inactive']
},
organisation:{
    type: String,
    enum: ['lalbaba', 'patro','mefy']
},

password: {
    type: String
},
role: {
    type: String,
    enum: ['superAdmin', 'admin', 'accounts','siteIncharge']
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
userSchema.pre('findOne', function (next) {
    this.populate('superAdminId');
    next();
});
userSchema.pre('find', function (next) {
    this.populate('superAdminId');
    next();
});
userSchema.plugin(uniqueValidator);
const user = module.exports = mongoose.model('user', userSchema)