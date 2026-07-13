const taskModel = require('../models/task.model');

// Admin only: create a task and assign it to an employee
async function createTask(req, res) {
    const { taskTitle, taskDescription, taskDate, category, assignedTo } = req.body;

    if (!taskTitle || !assignedTo) {
        return res.status(400).json({ message: 'taskTitle and assignedTo are required' });
    }

    const task = await taskModel.create({
        taskTitle,
        taskDescription,
        taskDate,
        category,
        assignedTo,
        createdBy: req.user.id,
        status: 'new'
    });

    res.status(201).json({
        message: 'Task created successfully',
        task
    });
}

// Admin only: see every task in the system
async function getAllTasks(req, res) {
    const tasks = await taskModel
        .find()
        .populate('assignedTo', 'firstName email')
        .sort({ createdAt: -1 });

    res.status(200).json({
        message: 'Tasks fetched successfully',
        tasks
    });
}

// Employee: see only the tasks assigned to them
async function getMyTasks(req, res) {
    const tasks = await taskModel
        .find({ assignedTo: req.user.id })
        .sort({ createdAt: -1 });

    res.status(200).json({
        message: 'Tasks fetched successfully',
        tasks
    });
}

// Employee: accept a new task, or mark an active task completed/failed
async function updateTaskStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'active', 'completed', 'failed'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }

    // Make sure employees can only update their own tasks
    const task = await taskModel.findOne({ _id: id, assignedTo: req.user.id });

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    task.status = status;
    await task.save();

    res.status(200).json({
        message: 'Task updated successfully',
        task
    });
}

module.exports = { createTask, getAllTasks, getMyTasks, updateTaskStatus };
