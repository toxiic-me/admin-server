const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Define the user schema
const employeeSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure email is unique
    },
    phone: {
        type: Number,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    course: {
        type: [String],
        required: true
    },
    createDate: {
        type: Number,
        required: true
    }
});

employeeSchema.pre('save', async function (next) {
    if (!this.id) {
        // If employee ID is not set, fetch the total count of employees and set it as the ID
        const totalEmployeesCount = await this.constructor.countDocuments({});
        this.id = totalEmployeesCount + 1;
    }
    next();
});

// Method to generate a JSON Web Token (JWT) for the user
employeeSchema.methods.generateToken = async function () {
    try {
        // Sign a JWT token with user information and a secret key
        return jwt.sign({
            employeeId: this.id,
            employeeEmail: this.email,
        },
            process.env.JWT_SECRET_KEY, // Secret key for signing the token
            {
                expiresIn: '30d' // Token expiration time
            });
    } catch (error) {
        // Log any error that occurs during token generation
        console.error(error);
    }
}


// Define the model or collection name
const Employees = mongoose.model('Employees', employeeSchema);

// Export the Users model
module.exports = Employees;
