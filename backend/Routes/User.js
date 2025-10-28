const express = require('express');

const upload = require('../Middlewares/upload');

const {signup,login,updateStreak} = require('../Controllers/User')

const router = express.Router();

router.post('/signup',upload.single('profileImage'),signup);

router.post('/login',login)



module.exports = router;