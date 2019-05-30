const mongoose = require('mongoose');
var schema = mongoose.Schema;
const consignmentSchema = mongoose.Schema({
    tl_number: {
        type: String
    },
    product: {
        type: String
    },

    location_number: {
        type: String
    },
    challan_number: {
        type: String
    },
    challan_doc: {
        type: schema.ObjectId,
        ref: 'file'
    },
    challan_date: {
        type: String,
    },
    consignor: {                      //id
        type: String
    },
    consignee: {                            //id
        type: String
    },
    consignment_date: {                            //id
        type: String
    },
    reference_number: {
        type: String
    },
    truck_number: {
        type: String
    },
    origin_place: {
        type: String
    },
    destination: {
        type: String
    },
    authorize_person: {
        type: String               //id
    },
    driver_license_number: {
        type: String
    },
    driver_name: {
        type: String               //id
    },
    quantity:{
        gross_wt: {
            type: String
        },
        tare_wt: {
            type: String
        },
        net_wt: {
            type: String
        }
    },
    advance_payment:{
        diesel_expenses:{
            type: String,
           
        },
        driver_expenses:{
            type: String, 
        },
        toll_expenses:{
            type: String
        },
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

consignmentSchema.pre('findOne', function (next) {
    this.populate('userId');
    next();
});
consignmentSchema.pre('find', function (next) {
    this.populate('userId');
    next();
});

const consignment = module.exports = mongoose.model('consignment', consignmentSchema)