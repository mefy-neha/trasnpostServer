const mongoose = require('mongoose');
var schema = mongoose.Schema;
const dieselSchema = mongoose.Schema({
    pump_name:{
        type: schema.ObjectId,
        ref: 'contact'               ///id of vendor
    },
    driverId:{
        type: schema.ObjectId,
        ref: 'contact'
    },
    truckId:{
        type: schema.ObjectId,
        ref: 'fleet'
    },
    date:{
        type: String
    },
    confirmed:{
        type:Boolean,
        default: false
    },
    diesel:{
        type: String
    },
    notes:{
        type: String
    },
    actual_diesel:{
        type: String  
    },
    actual_date:{
        type: String  
    },
    actual_amount:{
        type: String  
    },
    userId: {
        type: schema.ObjectId,
        ref: 'user'
    },
    superAdminId: {
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
dieselSchema.pre('findOne', function (next) {
        this.populate('userId');
        next();
    });
    dieselSchema.pre('find', function (next) {
        this.populate('userId');
        next();
    });
    dieselSchema.pre('findOne', function (next) {
        this.populate('driverId');
        next();
    });
    dieselSchema.pre('find', function (next) {
        this.populate('driverId');
        next();
    });
    dieselSchema.pre('findOne', function (next) {
        this.populate('pump_name');
        next();
    });
    dieselSchema.pre('find', function (next) {
        this.populate('pump_name');
        next();
    });
    dieselSchema.pre('findOne', function (next) {
        this.populate('truckId');
        next();
    });
    dieselSchema.pre('find', function (next) {
        this.populate('truckId');
        next();
    });
    const diesel = module.exports = mongoose.model('diesel', dieselSchema)