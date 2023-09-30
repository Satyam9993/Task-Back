const express = require('express');
const router = express.Router();

const User = require('./Auth');
const Task = require('./Task');

router.use('/task', Task);
router.use('/auth', User);

module.exports = router;