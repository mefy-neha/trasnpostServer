const mongoose = require('mongoose');
var schema = mongoose.Schema;
const orderSchema = mongoose.Schema({

tender_number:{
        type:String,
    },
induction_tt:{
        type: String 
    },
   
rate_quoted:[{
    item:{
        type: String
        },
    rate:{
        type: String
        },
    uom:{
        type: String
        },
    notes:{
        type: String
        }
}],
tts: [{
    quantity: {
        type: String
    },
    uom: {
        type: String
    },
    notes: {
        type: String
    }
}],
terms_condition:{
    doc: {
        type: schema.ObjectId,
        ref: 'file'
    },
    text:{
        type: String  
    }
},
spcl_condition:{
    doc: {
        type: schema.ObjectId,
        ref: 'file'
    },
    text:{
        type: String  
    }
},
transport_guide:{
    doc: {
        type: schema.ObjectId,
        ref: 'file'
    },
    text:{
        type: String  
    }
},
pbta:{
    doc: {
        type: schema.ObjectId,
        ref: 'file'
    },
    text:{
        type: String  
    }
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

orderSchema.pre('findOne', function (next) {
    this.populate('userId');
    next();
});
orderSchema.pre('find', function (next) {
    this.populate('userId');
    next();
});

const order = module.exports = mongoose.model('order', orderSchema)