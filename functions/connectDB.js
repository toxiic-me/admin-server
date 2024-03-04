const mongoose = require('mongoose');


// function to connect to Oolkar database
const connectDB = async (database) => {
    try {
        console.log("Connecting to Admin Panel...");
        await mongoose.connect(database)
        console.log("Connected to Admin Panel")
    } catch (error) {
        console.log("Connection failed to Admin Panel")
        process.exit(0);
    }
}


module.exports = connectDB;