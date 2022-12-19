const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const parameterSchema = new mongoose.Schema({
    business_name:{
        type: String,
        required: true,
        min: 5
    },
    business_id:{
        type: String,
        required: true,
    },
    business_bio:{
        type: String,
        required: true,
    },
    business_address:{
        type: String,
        required: true,
    },
    business_location:{
        type: String,
        required: true,
    },
    notify_login:{
        type: Boolean,
    },
    uses_2fa:{
        type: Boolean,
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


module.exports = mongoose.model('Parameter', parameterSchema);