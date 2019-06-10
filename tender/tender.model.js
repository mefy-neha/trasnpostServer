const mongoose = require('mongoose');
var schema = mongoose.Schema;
const tenderSchema = mongoose.Schema({
  
    companyId: {
        type: schema.ObjectId,
        ref: 'company'
    },
    fleetId: {
        type: schema.ObjectId,
        ref: 'fleet'
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
// petrolSchema.pre('findOne', function (next) {
//         this.populate('userId');
//         next();
//     });
// petrolSchema.pre('find', function (next) {
//         this.populate('userId');
//         next();
//     });

    const tender = module.exports = mongoose.model('tender', tenderSchema)