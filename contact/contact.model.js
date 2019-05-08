const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var schema = mongoose.Schema;
const contactSchema = mongoose.Schema({
company_name: {
    type: String
},
email: {
    type: String,
    unique: true,
    sparse: true
},
adminId:{
    type: schema.ObjectId,
    ref: 'user'
},
contactType:{
    type: String,
    enum: ['customer', 'vendor','employee']
},

phoneNumber: {
    type: String
},
website: {
    type: String
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
contactSchema.pre('findOne', function (next) {
    this.populate('userId');
    next();
});
contactSchema.pre('find', function (next) {
    this.populate('userId');
    next();
});
contactSchema.plugin(uniqueValidator);
const contact = module.exports = mongoose.model('contact', contactSchema)