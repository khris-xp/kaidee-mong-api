import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    content_id: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    title: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    videos: {
        type: Object,
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Content', contentSchema);