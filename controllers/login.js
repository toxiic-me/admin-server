const Employees = require('../models/Employees.js');

const login = async (req, res) => {
    const { username, password } = req.body;
    console.log('logging employee');

    try {
        let employeeExist = await Employees.findOne({ name: username });

        if (!employeeExist) {
            console.log(employeeExist);
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // For the sake of example, checking password as '123password'. 
        // In a real-world scenario, you should compare hashed passwords.
        if (password === '123password') {
            const token = await employeeExist.generateToken();
            return res.status(200).json({
                message: 'Login successful',
                token: token,
            });
        } else {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = login;
