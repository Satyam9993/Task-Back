const express = require('express');
const router = express.Router();

const { 
    Login,
    SignIn
} = require('../../controller/Auth');

router.post('/login', Login)
router.post('/signin', SignIn)

module.exports = router;