const mongoose = require('mongoose');
var schema = mongoose.Schema;
const petrolSchema = mongoose.Schema({
  
    diesel_price:{
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
// petrolSchema.pre('findOne', function (next) {
//         this.populate('userId');
//         next();
//     });
// petrolSchema.pre('find', function (next) {
//         this.populate('userId');
//         next();
//     });

    const petrol = module.exports = mongoose.model('petrol', petrolSchema)