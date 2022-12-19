const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const vehicleModelSchema = new mongoose.Schema({
    fk_veh_make: {
        type: Schema.Types.ObjectId,
        ref: 'VehicleMake',
        required: true
    },
    title:{
        type: String,
        required: true,
        min: 5
    },
    description:{
        type: String,
        min: 5,
        max: 255,
    },
    yom:{
        type: String,
        min: 2
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('VehicleModel', vehicleModelSchema);