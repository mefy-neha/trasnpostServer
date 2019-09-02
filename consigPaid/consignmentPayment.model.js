const mongoose = require('mongoose');
var schema = mongoose.Schema;
const paidSchema = mongoose.Schema({   
    items_details:[{
        cosignmentId:{
            type: schema.ObjectId,
            ref: 'consignment'
        },
        itemId:{
            type: String,
        },  
        departmental_deduction:{
            type: String  
        },
        tds:{
            type: String  
        },
        shortage:{
            type: String  
        },
        gst_tds:{
            type: String  
        },
     
        ccms:{
            type: String  
        },
        paymentDate:{
            type: String  
        },
        paid_amount: {
            type: String
        },
        due_amount: {
            type: String
        },
        amount_status: {
            type: String,
            enum:['complete','incomplete'],
            default:'incomplete'
        },
      
    }],
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

paidSchema.pre('findOne', function (next) {
    this.populate('userId');
    next();
});
paidSchema.pre('find', function (next) {
    this.populate('userId');
    next();
});
// billSchema.pre('findOne', function (next) {
//     this.populate('cosignmentId');
//     next();
// });
// billSchema.pre('find', function (next) {
//     this.populate('cosignmentId');
//     next();
// });

const paid = module.exports = mongoose.model('paid', paidSchema)