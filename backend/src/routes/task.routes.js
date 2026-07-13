const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const { authUser, authAdmin } = require('../middleware/auth.middleware');

router.post('/', authAdmin, taskController.createTask);

router.get('/', authAdmin, taskController.getAllTasks);

router.get('/mine', authUser, taskController.getMyTasks);

router.patch('/:id/status', authUser, taskController.updateTaskStatus);

module.exports = router;
 