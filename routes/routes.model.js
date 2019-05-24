const mongoose = require('mongoose');
var schema = mongoose.Schema;
const routeSchema = mongoose.Schema({

from_location: {
    type: String
},

to_location: {
    type: String,
},
organisation:{
    type: String
},
stopage:[],

total_km:{
    type: String,
},

diesel_expenses:{
    type: String,
   
},
driver_expenses:{
    type: String, 
},
toll_expenses:{
    type: String
},
others_expenses: [{
    name: {
        type: String
    },
    expenses: {
        type: String
    }  
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

});
routeSchema.pre('find', function (next) {
    this.populate('UserId');
    next();
});
routeSchema.pre('findOne', function (next) {
    this.populate('UserId');
    next();
});

const route = module.exports = mongoose.model('route', routeSchema)