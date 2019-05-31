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
    ownership: {
        type: String,
        enum: ['owned', 'contract']
    },
    capacity:{
        type: String
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
    vehicle_insurance: {
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
    product_insurance: {
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
    explosive: {
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
    calibration_chart: {
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
    national_permit: {
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
    national_permit_A: {
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
    national_permit_B: {
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
    road_tax: {
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
    pollution: {
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
    sco: {
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
    abs: {
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
    hydro_testing: {
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
    fitness: {
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
        valid_upto: {
            type: String
        }
    }],
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