"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | StockAPI Project
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')

// User Model:
const CourseSchema = new mongoose.Schema({

    courseName: {
        type: String,
        trim: true,
        required: true,
    },

    courseContent: {
        type: String,
        trim: true,
        required: true,
    },
    
    courseLabel: {
        type: String,
        trim: true,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    }


}, { collection: 'courses', timestamps: true })

/* ------------------------------------------------------- */
module.exports = mongoose.model('Course', CourseSchema);