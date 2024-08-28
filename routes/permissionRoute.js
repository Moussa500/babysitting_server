const express=require('express');
var route=express.Router();
const permissionHandler=require("../controller/permissionHandler");
const EndPoints=require('../constants/endPoints');
route.get(EndPoints.Permission.getAdminPermission,permissionHandler.getPermissions);
route.get(EndPoints.Permission.assignPermission,permissionHandler.assingPermissions);
route.put(EndPoints.Permission.banAndUnbanUser,permissionHandler.banAndUnbanUser);
module.exports=route;