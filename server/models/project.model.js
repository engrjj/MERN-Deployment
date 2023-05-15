const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    p_name: { 
        type: String,
        minlength: [3, "First name must be at least 3 characters."],
        required: true
    },
    due_date: { 
        type: Date,
        required: true,
        min: Date.now
    },
    status: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);