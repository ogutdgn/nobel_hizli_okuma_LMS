"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Assignment Controller:

const Assignment = require('../models/assignment');

module.exports = {
    list: async (req, res) => {
        /*
            #swagger.tags = ["Assignments"]
            #swagger.summary = "List Assignments"
        */

        try {
            let filter = {};

            if (!req.user.isAdmin) {
                // Eğer kullanıcı admin değilse sadece kendi ödevlerini görür
                filter.studentId = req.user._id;
            }

            console.log("Fetching assignments with filter:", filter);

            const data = await Assignment.find(filter)
                .populate({ path: 'studentId', select: 'username email' })
                .populate({ path: 'teacherId', select: 'username email' });

            console.log("Assignments fetched successfully:", data);

            res.status(200).send({
                error: false,
                data
            });
        } catch (error) {
            console.error("Error fetching assignments:", error);
            res.status(500).send({
                error: true,
                message: "Failed to fetch assignments.",
                details: error.message,
            });
        }
    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Assignments"]
            #swagger.summary = "Create Assignment"
        */

        try {
            const data = await Assignment.create(req.body);

            res.status(201).send({
                error: false,
                data
            });
        } catch (error) {
            console.error("Error creating assignment:", error);
            res.status(500).send({
                error: true,
                message: "Failed to create assignment.",
                details: error.message,
            });
        }
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Assignments"]
            #swagger.summary = "Get Single Assignment"
        */

        try {
            console.log("Fetching assignment with ID:", req.params.id);

            const data = await Assignment.findOne({ _id: req.params.id })
                .populate({ path: 'studentId', select: 'username email' })
                .populate({ path: 'teacherId', select: 'username email' });

            res.status(200).send({
                error: false,
                data
            });
        } catch (error) {
            console.error("Error fetching assignment:", error);
            res.status(500).send({
                error: true,
                message: "Failed to fetch assignment.",
                details: error.message,
            });
        }
    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Assignments"]
            #swagger.summary = "Update Assignment"
        */

        try {
            console.log("Updating assignment with ID:", req.params.id);

            const data = await Assignment.updateOne({ _id: req.params.id }, req.body, { runValidators: true });

            res.status(202).send({
                error: false,
                data,
                new: await Assignment.findOne({ _id: req.params.id })
            });
        } catch (error) {
            console.error("Error updating assignment:", error);
            res.status(500).send({
                error: true,
                message: "Failed to update assignment.",
                details: error.message,
            });
        }
    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Assignments"]
            #swagger.summary = "Delete Assignment"
        */

        try {
            console.log("Deleting assignment with ID:", req.params.id);

            const data = await Assignment.deleteOne({ _id: req.params.id });

            res.status(data.deletedCount ? 204 : 404).send({
                error: !data.deletedCount,
                message: data.deletedCount ? "Assignment deleted successfully." : "Assignment not found.",
                data
            });
        } catch (error) {
            console.error("Error deleting assignment:", error);
            res.status(500).send({
                error: true,
                message: "Failed to delete assignment.",
                details: error.message,
            });
        }
    },
};
