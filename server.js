require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./functions/connectDB.js');

// importing the routes
const routes = require('./routes/routes.js')

// defining the express app and PORT
const app = express();
const PORT = process.env.PORT || 8080;

// using the middleware and routes
app.use(express.json({ limit: '10mb' }));
app.use(cors());
app.use('/', routes)


// calling the connectDB function and listening server in then block
connectDB(process.env.DATABASE_URI).then(() => {
    // listening server
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
});
