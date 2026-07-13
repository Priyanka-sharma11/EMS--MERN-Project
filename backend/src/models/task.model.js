const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskTitle: {
        type: String,
        required: true,
        trim: true
    },
    taskDescription: {
        type: String,
        default: ''
    },
    taskDate: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        default: 'General'
    },
    status: {
        type: String,
        enum: ['new', 'active', 'completed', 'failed'],
        default: 'new'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true });

const taskModel = mongoose.model('task', taskSchema);

module.exports = taskModel;
