var express = require('express');
const EndPoints = require('../constants/endPoints');
var router = express.Router();
const usersController = require('../controller/usersController');

router.get(EndPoints.User.getAllUsers, usersController.getAllUsers);
router.get(EndPoints.User.getUserById, usersController.getUserById);
router.get(EndPoints.User.searchUserByName, usersController.searchUserByName);
router.post(EndPoints.User.addUserBabySitter, usersController.addUserBabySitter);
router.post(EndPoints.User.addUserParent, usersController.addUserParent);
router.put(EndPoints.User.updateUserBabySitter, usersController.updateUserBabySitter);
router.delete(EndPoints.User.deleteUser, usersController.deleteUser);
router.post(EndPoints.User.addUser, usersController.addUser);

module.exports = router;
