const Employees = require('../models/Employees.js')

const getEmployeesData = async (req, res) => {
    try {
        let employeesData = await Employees.find({}).sort({ id: 1 });
        if (employeesData.length > 0) {
            res.status(200).json(employeesData)
        } else {
            res.status(500).json([])
        }
    } catch (error) {
        res.status(500).json({ error: 'Server Internal Error' })
    }
}

module.exports = getEmployeesData