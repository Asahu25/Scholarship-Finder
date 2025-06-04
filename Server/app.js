const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const { mongoConnect, store } = require("./utils/databaseUtils");
const scholarItemRoutes = require('./routes/scholarItem');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, 
        httpOnly: true,
        secure: false, 
        sameSite: 'lax'
    }
}));

app.use(scholarItemRoutes);

app.use((error, req, res, next) => {
    console.error("Server Error:", error);
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    res.status(status).json({ message: message });
});

mongoConnect(() => {
    console.log("MongoDB Connected Successfully");
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});
