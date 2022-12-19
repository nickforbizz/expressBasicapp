const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
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
    category:{
        type: String,
        min: 6,
        max: 1024
    },
    image: {
        type: String,
    },
    
    image_url: {
        type: String,
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


module.exports = mongoose.model('Post', postSchema);