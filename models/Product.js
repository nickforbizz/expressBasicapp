const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
    fk_product_cat: {
        type: Schema.Types.ObjectId,
        ref: 'ProductCategory',
        required: true
    },
    fk_veh_make: {
        type: Schema.Types.ObjectId,
        ref: 'VehicleMake',
        required: true
    },
    fk_veh_model: {
        type: Schema.Types.ObjectId,
        ref: 'VehicleModel',
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
    quantity:{
        type: Number,
    },
    size:{
        type: String,
        min: 2
    },
    color:{
        type: String,
        min: 2
    },
    discount:{
        type: Boolean,
        dafault: false
    },
    discount_amt:{
        type: Number,
        min: 1
    },
    is_sold:{
        type: Boolean,
        default: false
    },
    price:{
        type: Number,
        min: 2
    },
    condition:{
        type: String,
        min: 2
    },
    body_type:{
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


module.exports = mongoose.model('Product', productSchema);