const auth = require('../controller/authController');
var express = require('express');
var router = express.Router();
const EndPoints=require('../constants/endPoints');
const authenticateToken=require('../middlewares/authMiddleware')
router.post(EndPoints.Auth.login,auth.login);
router.post(EndPoints.Auth.register,auth.register);

router.get(EndPoints.Auth.protected,authenticateToken,async (req,res)=>{
    try {
        const userId=req.user.userId;
        const user=await UserController.getUserById(userId);
        if(!user){
            return res.status(404).json({error:"this user doas not exist"});
        }
        res.json({
            message:'Access granted',
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                address:user.address,
                role:user.role,
                phone:user.phone
            }
        })
    } catch (error) {
        
    }
});
module.exports=router;