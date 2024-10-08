var express = require('express');
const EndPoints = require('../constants/endPoints');
var router = express.Router();
const usersController = require('../controller/usersController');
const { protect } = require('../middlewares/authMiddleware');
const upload=require('../middlewares/uploadFile');
const parseFormData=require('../middlewares/parseFormData');
router.get(EndPoints.User.getAllUsers,usersController.getAllUsers);
router.get(EndPoints.User.getUserById, usersController.getUserById);
router.get(EndPoints.User.searchUserByName, usersController.searchUserByName);
router.put(EndPoints.User.updateUserBabySitter,protect,upload.single("cv"),parseFormData,usersController.updateUserBabySitter);
router.put(EndPoints.User.updateUserParent,protect,usersController.updateUserParent);
router.put(EndPoints.User.updateUserAdmin,protect,usersController.updateUserAdmin);
router.delete(EndPoints.User.deleteUser,protect,usersController.deleteUser);
router.post(EndPoints.User.addUser,usersController.addUser);
module.exports = router;
