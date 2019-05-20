const mongoose = require('mongoose');
var schema = mongoose.Schema;
const employeeSchema = mongoose.Schema({
    name:{
        type:String
    },
    contactType:{
        type: String,
        default:'employee'
    },
    organisation: {
        type: String,
        enum: ['lalbaba', 'patro']
    },
    phoneNumber:{
        type:String
    },
    aadhar:{
        number: {
            type: String
        },
        doc: {
            type: schema.ObjectId,
            ref: 'file'
        }
    },
    voterId:{
        number: {
            type: String
        },
        doc: {
            type: schema.ObjectId,
            ref: 'file'
        }
    },
    picture:{
        type: schema.ObjectId,
            ref: 'file'
    },
    others: [{
        name: {
            type: String
        },
        number: {
            type: String
        },
        doc: {
            type: schema.ObjectId,
            ref: 'file'

        },
        // valid_upto: {
        //     type: String
        // }
    }],
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

employeeSchema.pre('findOne', function (next) {
    this.populate('userId');
    next();
});
employeeSchema.pre('find', function (next) {
    this.populate('userId');
    next();
});


const employee = module.exports = mongoose.model('employee', employeeSchema)