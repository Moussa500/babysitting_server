const auth = require('../controller/authController');
var express = require('express');
var router = express.Router();
const EndPoints=require('../constants/endPoints');
router.post(EndPoints.Auth.login,auth.login);
router.post(EndPoints.Auth.register,auth.register);