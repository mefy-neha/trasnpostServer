const mongoose = require('mongoose');
var schema = mongoose.Schema;
const uploadSchema = mongoose.Schema({
file:{
    type : Object
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
const file = module.exports = mongoose.model('file', uploadSchema)