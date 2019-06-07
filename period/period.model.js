const mongoose = require('mongoose');
var schema = mongoose.Schema;
const periodSchema = mongoose.Schema({
    period_name:{
        type:String,
        enum:['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec']
    },

    from:{
        type: String
    },
    quarter_start:{
        type: String 
    },
    quarter_end:{
        type: String  
    },
    fiscle_year:{
        type: String  
    },
    assessment_year:{
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