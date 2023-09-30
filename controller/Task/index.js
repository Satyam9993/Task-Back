const Joi = require('joi');
const Tasks = require('../../models/Tasks');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWTSECRET = process.env.JWT_SECRET;


// Schema for Tasks
const TaskSignInschema = Joi.object({
    title: Joi.string().required("title is required"),
    description: Joi.string().required("description is required"),
    status: Joi.string().required("status is required"),
});


exports.createTask = async (req, res) => {
    try {
        const inputData = req.body;
        const { error, value } = TaskSignInschema.validate(inputData);

        if (error) {
            return res.status(422).send({ error: error.details[0].message })
        }
        await Tasks.create({
            userId: req.user.id,
            title: value.title,
            description: value.description,
            status: value.status
        }).then(async (task) => {
            return res.status(201).send({
                "task": task
            })
        }).catch(err => {
            return res.status(402).send({
                err: `Something went wrong ${err}`
            })
        })
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}

exports.updateTask = async (req, res) => {
    try {
        const inputData = req.body;
        const { error, value } = TaskSignInschema.validate(inputData);

        if (error) {
            return res.status(422).send({ error: error.details[0].message })
        }
        await Tasks.findOneAndUpdate({ _id: req.params.taskId, userId: req.user.id }, {
            $set: {
                title: value.title,
                description: value.description,
                status: value.status,
            }
        }, { new: true }).then(async (task) => {
            return res.status(201).send({
                "task": task
            })
        }).catch(err => {
            return res.status(402).send({
                err: `Something went wrong ${err.message}`
            })
        })
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}


exports.deleteTask = async (req, res) => {
    try {
        await Tasks.findOneAndDelete({ _id: req.params.taskId, userId: req.user.id })
            .then(async (task) => {
                return res.status(201).send({
                    "success": "task delete successfully"
                })
            }).catch(err => {
                return res.status(402).send({
                    err: `Something went wrong ${err}`
                })
            })
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}


exports.getallTask = async (req, res) => {
    try {
        
        await Tasks.find({ userId: req.user.id }).sort({ created_at: -1 })
        .then(async (tasks) => {
            return res.status(201).send({
                "tasks": tasks
            })
        }).catch(err => {
            return res.status(402).send({
                err: `Something went wrong ${err}`
            })
        })
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}