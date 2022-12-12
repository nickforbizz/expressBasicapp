const mongoose = require('mongoose');

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
    created_at: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Post', postSchema);