const mongoose = require('mongoose');
var schema = mongoose.Schema;
const fleetSchema = mongoose.Schema({

truck_number: {
    type: String
},
userId: {
    type: schema.ObjectId,
    ref: 'user'
},
superAdminId: {
    type: schema.ObjectId,
    ref: 'user'
},
ownership:{
    type: String,
    enum: ['owned', 'contract']
},
rc: {
    number: {
        type: String,
    },
    doc: {
        type: schema.ObjectId,
        ref: 'file'
    },
    valid_upto: {
        type: String
    }
},
insurance: {
    number: {
        type: String
    },
    doc: {
        type: schema.ObjectId,
        ref: 'file'

    },
    valid_upto: {
        type: String
    }
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
fleetSchema.pre('findOne', function (next) {
    this.populate('userId');
    next();
});
fleetSchema.pre('find', function (next) {
    this.populate('userId');
    next();
});

const fleet = module.exports = mongoose.model('fleet', fleetSchema)