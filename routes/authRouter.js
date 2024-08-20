var express=require('express');
const EndPoints=require('../constants/endPoints');
var router=express.router();
const authController=require('../controller/authController');
const upload=require('../middlewares/uploadFile');

router.get(EndPoints.User.getAllUser,authController.getAllUser);
router.get(EndPoints.User.getUserById,authController.getUserById);
router.get(EndPoints.User.searchUserByNameSort,authController.searchUserByNameSort);
router.post(EndPoints.User.addUserBabbySitter,authController.addUserBabbySitter);
router.post(EndPoints.User.addUserParent,authController.addUserParent);
router.post(EndPoints.User.addUserClient,authController.addUserClient);
router.put(EndPoints.User.updateUser,authController.updateUser);
router.delete(EndPoints.User.deleteUser,authController.deleteUser);