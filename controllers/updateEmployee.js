const Employees = require("../models/Employees.js");

const updateEmployee = async (req, res) => {
    const { id, email, phone, name } = req.body;

    // validations
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneAsString = phone.toString();

    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }
    if (phoneAsString.length !== 10) {
        return res.status(400).json({ error: 'Phone number must contain 10 digits' });
    }

    try {

        let updatedEmployee = await Employees.updateOne({ id }, { ...req.body });
        if (updatedEmployee.acknowledged === false || updatedEmployee.modifiedCount !== 1) {
            res.status(500).json({ error: 'Unable to update employee' });
        } else {
            res.status(200).json({ error: 'Employee updated successfully' });
        }
    } catch (error) {
        console.log('Error while deleting a employee: ', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = updateEmployee;
