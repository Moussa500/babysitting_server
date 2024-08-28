const express=require('express');
var route=express.Router();
const permissionHandler=require("../controller/permissionHandler");
const EndPoints=require('../constants/endPoints');
const {protect} = require('../middlewares/authMiddleware');
route.get(EndPoints.Permission.getAdminPermission,protect,permissionHandler.getPermissions);
route.get(EndPoints.Permission.assignPermission,protect,permissionHandler.assingPermissions);
route.put(EndPoints.Permission.banAndUnbanUser,protect,permissionHandler.banAndUnbanUser);
module.exports=route;