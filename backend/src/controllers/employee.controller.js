const userModel = require("../models/user.model");
const taskModel = require("../models/task.model");
const bcrypt = require("bcryptjs");

// Admin only: create a new employee account
async function createEmployee(req, res) {
  const { firstName, email, password } = req.body;

  if (!firstName || !email || !password) {
    return res
      .status(400)
      .json({ message: "firstName, email and password are required" });
  }

  const existing = await userModel.findOne({ email });

  if (existing) {
    return res
      .status(409)
      .json({ message: "An employee with this email already exists" });
  }

  const hash = await bcrypt.hash(password, 10);

  const employee = await userModel.create({
    firstName,
    email,
    password: hash,
    role: "employee",
  });

  res.status(201).json({
    message: "Employee created successfully",
    employee: {
      id: employee._id,
      firstName: employee.firstName,
      email: employee.email,
      role: employee.role,
    },
  });
}

// Admin only: list every employee, with their task counts attached
// (this is what powers the "All Employees" table on the admin dashboard)
async function getAllEmployees(req, res) {
  const employees = await userModel
    .find({ role: "employee" })
    .select("-password");

  const employeesWithCounts = await Promise.all(
    employees.map(async (emp) => {
      const tasks = await taskModel.find({ assignedTo: emp._id });

      const taskCounts = {
        newTask: tasks.filter((t) => t.status === "new").length,
        active: tasks.filter((t) => t.status === "active").length,
        completed: tasks.filter((t) => t.status === "completed").length,
        failed: tasks.filter((t) => t.status === "failed").length,
      };

      return {
        id: emp._id,
        firstName: emp.firstName,
        email: emp.email,
        taskCounts,
      };
    }),
  );

  res.status(200).json({
    message: "Employees fetched successfully",
    employees: employeesWithCounts,
  });
}

module.exports = { createEmployee, getAllEmployees };
