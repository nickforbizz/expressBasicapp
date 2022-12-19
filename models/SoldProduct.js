const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const soldProductSchema = new mongoose.Schema({
    fk_product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    description:{
        type: String,
        min: 5,
        max: 255,
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


module.exports = mongoose.model('SoldProduct', soldProductSchema);