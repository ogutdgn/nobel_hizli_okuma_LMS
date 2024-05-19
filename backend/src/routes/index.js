"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | StockAPI Project
------------------------------------------------------- */
const router = require('express').Router()

/* ------------------------------------------------------- */
// routes/:

// URL: /

// auth:
router.use('/auth', require('./auth'))
// user:
router.use('/users', require('./user'))
// token:
router.use('/tokens', require('./token'))


// assingment:
router.use('/assignments', require('./assignment'))
// course:
router.use('/courses', require('./course'))
// enrollment:
router.use('/enrollments', require('./enrollment'))


// document:
router.use('/documents', require('./document'))

/* ------------------------------------------------------- */
module.exports = router