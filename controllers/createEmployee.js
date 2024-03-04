const Employees = require("../models/Employees.js");

const createEmployee = async (req, res) => {
    const { name, email, phone, courses } = req.body;
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
        let isEmailAlreadyPresent = await Employees.findOne({ email });

        if (isEmailAlreadyPresent) {
            return res.status(409).json({ error: 'Email already in use' });
        }

        let newEmployee = await Employees.create({ ...req.body, course: courses });
        if (newEmployee) {
            return res.status(200).json({ message: 'Employee created successfully' });
        } else {
            throw new Error('Unable to create new employee');
        }
    } catch (error) {
        console.log('Error while creating new employee: ', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = createEmployee;
