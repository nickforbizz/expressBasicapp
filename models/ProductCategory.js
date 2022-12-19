const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const productCategorySchema = new mongoose.Schema({
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


module.exports = mongoose.model('ProductCategory', productCategorySchema);