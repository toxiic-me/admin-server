// defining the client via express routers
const express = require('express');
const routes = express.Router();

// importing the middlewares
const authenticateToken = require('../middlewares/authenticateToken.js')

// importing the controllers
const createEmployee = require('../controllers/createEmployee.js');
const deleteEmployee = require('../controllers/deleteEmployee.js');
const updateEmployee = require('../controllers/updateEmployee.js');
const getEmployeesData = require('../controllers/getEmployeesData.js');
const login = require('../controllers/login.js');


// setting up the routes
routes
    .post('/login', login)
    .get('/get-employees', authenticateToken, getEmployeesData)
    .post('/create-employee', authenticateToken, createEmployee)
    .post('/delete-employee', authenticateToken, deleteEmployee)
    .post('/update-employee', authenticateToken, updateEmployee)



module.exports = routes;
