const mongoose = require('mongoose');
var schema = mongoose.Schema;
const rateSchema = mongoose.Schema({

    customerId: {
        type: schema.ObjectId, //id of customer
        ref: 'contact'
    },
    from_km:{
        type:String
    },
    to_km: {
        type: String   
    },
    rate: {
        type:String
    },
    
    within_state: {
        type: Boolean   
    },
    unit: {
        type: String,
        enum:['ton','kl','kl/km','cyl','cyl/rtkm']
    },
    truck_confg: {
        type: String,
        enum:['12','19','20','24','306','450','1']
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