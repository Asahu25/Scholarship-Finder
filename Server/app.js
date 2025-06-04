const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const { mongoConnect, store } = require("./utils/databaseUtils");
//const scholarItemController = require("./controllers/scholarItemController");
const scholarItemRoutes = require('./routes/scholarItem');

const app = express();

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Session configuration
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true,
        secure: false, // set to true if using https
        sameSite: 'lax'
    }
}));

// Routes
app.use(scholarItemRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
    console.error("Server Error:", error);
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    res.status(status).json({ message: message });
});

// Connect to MongoDB and start server
mongoConnect(() => {
    console.log("MongoDB Connected Successfully");
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});
