const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize'); 

const { environment } = require('./config'); // Assuming you use 'environment' here, not 'enviorment'
const isProduction = environment === 'production';
const routes = require('./routes'); // Import your routes after defining 'app'
const app = express();  // Initialize the app object

// Middleware setup
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

if (!isProduction) {
    app.use(cors()); // Enable CORS only in development
}

// CSRF protection
app.use(csurf({
    cookie: {
        httpOnly: true,
        secure: isProduction,  // Set to true in production
        sameSite: isProduction ? 'Lax' : false,  // Allow cookies to be sent only in same-site requests
    }
}));

// Register routes after initializing 'app'
app.use(routes);  // Now this will work because 'app' has been defined before this line

// Start the server
const { port } = require('./config');  // Get the port from your config
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
 
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldnt be found."); 
    err.title = "Resource Not Found"; 
    err.errors = ["The requested resource couldnt be found."]; 
    err.status = 404; 
    next(err); 
}); 

app.use((err, _req, _res, next) => {
    if (err instanceof ValidationError) {
        err.erros = err.errors.map((e) => e.message); 
        err.title = 'Validation error'; 
    }
    next(err);
}); 

app.use((err, _req, res, _next) => {
    res.status(err.status || 500); 
    console.error(err); 
    res.json({
        title: err.title || 'Server Error', 
        message: err.message, 
        errors: err.errors, 
        stack: isProduction ? null : err.stack
    }); 
}); 
