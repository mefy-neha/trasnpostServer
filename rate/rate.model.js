const mongoose = require('mongoose');
var schema = mongoose.Schema;
const rateSchema = mongoose.Schema({

    customerId: {
        type: schema.ObjectId, //id of customer
        ref: 'contact'
    },
    base_km:{
        type:String
    },
    base_rate: {
        type:String
    },
    add_km: {
        type: String   
    },
    add_km_rate: {
        type: String   
    },
    unit: {
        type: String,
        enum:['ton','pieces','kl']
    },
    effactive_date_from:{
        type: String,
    },
    effactive_date_to: {
        type: String    
    },
    userId: {
        type: schema.ObjectId,
        ref: 'user'
    },
    superAdminId: {
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

rateSchema.pre('findOne', function (next) {
    this.populate('userId');
    next();
});
rateSchema.pre('find', function (next) {
    this.populate('userId');
    next();
});
rateSchema.pre('findOne', function (next) {
    this.populate('customerId');
    next();
});
rateSchema.pre('find', function (next) {
    this.populate('customerId');
    next();
});
const rate = module.exports = mongoose.model('rate', rateSchema)