const mongoose = require('mongoose');
var schema = mongoose.Schema;
const periodSchema = mongoose.Schema({
    period_name:{
        type:String
    },

    from:{
        type: String
    },
    to:{
        type:String
    },
    period_status:{
        type:String,
        enup:['open','closed','unopend'],
        default:'upopend'
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

periodSchema.pre('findOne', function (next) {
    this.populate('userId');
    next();
});
periodSchema.pre('find', function (next) {
    this.populate('userId');
    next();
});

const period = module.exports = mongoose.model('period', periodSchema)