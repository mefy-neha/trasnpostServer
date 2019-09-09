const mongoose = require('mongoose');
var schema = mongoose.Schema;
const consignmentSchema = mongoose.Schema({
    truck_confg: {
        type: String
    },
    consignmentNumber:{
        type: String
    },
   
within_state:{
    type:Boolean
},
    // location_number: {
    //     type: String
    // },
    consignment:[{
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
        gross_wt: {
            type: String
        },
        tare_wt: {
             type: String
         },
        net_wt: {
            type: String
        },
        product: {
            type: String
        }
        
    }],
  
    price_type: {
        type: String,
        enum:['fdz','bfdz']
    },
    distance: {                            //destination place
        type: String
    },
    freight:{
        type:Number
    },
    consignor: {                      //customer id
        type: schema.ObjectId,
        ref: 'contact'
    },
    consignee: {                            //destination place
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
        type: schema.ObjectId,
        ref: 'user'              //id of employee
    },
    driver_license_number: {
        type: String
    },
    driver_name: {
        type: String               //id
    },
    // quantity:{
    //     gross_wt: {
    //         type: String
    //     },
    //     tare_wt: {
    //         type: String
    //     },
    //     net_wt: {
    //         type: String
    //     }
    // },
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
consignmentSchema.pre('findOne', function (next) {
    this.populate('consignor');
    next();
});
consignmentSchema.pre('find', function (next) {
    this.populate('consignor');
    next();
});
consignmentSchema.pre('findOne', function (next) {
    this.populate('authorize_person');
    next();
});
consignmentSchema.pre('find', function (next) {
    this.populate('authorize_person');
    next();
});

const consignment = module.exports = mongoose.model('consignment', consignmentSchema)