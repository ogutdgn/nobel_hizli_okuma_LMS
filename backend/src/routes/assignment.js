"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/assignment:

const assignment = require('../controllers/assignment')
const permissions = require('../middlewares/permissions')

// URL: /assignments

router.route('/(:id)?')
    .post(permissions.isTeacher, assignment.create)
    .get(permissions.isLogin, assignment.read)
    .put(permissions.isTeacher, assignment.update)
    .patch(permissions.isTeacher, assignment.update)
    .delete(permissions.isTeacher, assignment.delete)

/* ------------------------------------------------------- */
module.exports = router