const mongoose = require('mongoose');
var schema = mongoose.Schema;
const destinationSchema = mongoose.Schema({
    customerId:{
        type: schema.ObjectId,
        ref: 'customer'
    },
    details:[{
    location_code:{
        type:String
    },
    location_name:{
       type: String
      },
      address:{
        type: String   
      },
      serial_number:{
        type: String   
      }
    }],
    shift_to:{
        type: String,
        enum:['yes','no'],
        default:'no'
    },
    origin:{
        type: String,
        enum:['yes','no'],
        default:'no'
    },
    bill_to:{
        type: String,
        enum:['yes','no'],
        default:'no'
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
destinationSchema.pre('findOne', function (next) {
        this.populate('userId');
        next();
    });
    destinationSchema.pre('find', function (next) {
        this.populate('userId');
        next();
    });
    destinationSchema.pre('findOne', function (next) {
        this.populate('customerId');
        next();
    });
    destinationSchema.pre('find', function (next) {
        this.populate('customerId');
        next();
    });
    const destination = module.exports = mongoose.model('destination', destinationSchema)