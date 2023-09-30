const express = require('express');
const router = express.Router();
const fetchUser = require("../../middleware/fetchUser")
const { 
    createTask,
    updateTask,
    deleteTask,
    getallTask
} = require('../../controller/Task');

router.get('/',fetchUser, getallTask);
router.post('/',fetchUser, createTask);
router.put('/:taskId', fetchUser, updateTask)
router.delete('/:taskId', fetchUser, deleteTask)

module.exports = router;