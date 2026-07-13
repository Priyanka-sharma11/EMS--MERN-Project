const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');
const { authAdmin } = require('../middleware/auth.middleware');

router.post('/', authAdmin, employeeController.createEmployee);

router.get('/', authAdmin, employeeController.getAllEmployees);

module.exports = router;
 