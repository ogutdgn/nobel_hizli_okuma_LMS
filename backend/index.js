"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | StockAPI Project
------------------------------------------------------- */
const express = require('express');
const path = require("node:path")
const app = express();


/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require('dotenv').config({ path: __dirname + '/.env' })
const HOST = process.env?.HOST || '127.0.0.1'
const PORT = process.env?.PORT || 8000

// asyncErrors to errorHandler:
require('express-async-errors');


// Showing my static files to backend
app.use(express.static(path.join(__dirname, "public")));

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require('./src/configs/dbConnection');
dbConnection();

//? CORS
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000', // React uygulamanızın URL'si
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

/* ------------------------------------------------------- */
// Middlewares:

// Accept JSON:
app.use(express.json());

// Call static uploadFile:
app.use('/upload', express.static('./upload'));

// Check Authentication:
app.use(require('./src/middlewares/authentication'));

// Run Logger:
app.use(require('./src/middlewares/logger'));

// res.getModelList():
app.use(require('./src/middlewares/queryHandler'));

/* ------------------------------------------------------- */
// Routes:

// HomePath:
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to RENT A CAR API',
        documents: {
            swagger: '/documents/swagger',
            redoc: '/documents/redoc',
            json: '/documents/json',
        },
        user: req.user
    })
})



// Routes:
app.use(require('./src/routes/index'));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./public", "index.html"))
})

app.use("*", (req, res) => {
    res.status(404).json({ msg: "not found" })
})

/* ------------------------------------------------------- */

// errorHandler:
app.use("/api/v1/", require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, HOST, () => console.log(`http://${HOST}:${PORT}`));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')() // !!! It clear database.