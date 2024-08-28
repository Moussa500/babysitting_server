const auth = require('../controller/authController');
var express = require('express');
var router = express.Router();
const EndPoints = require('../constants/endPoints');
const upload = require("../middlewares/uploadFile");
const authenticateToken = require('../middlewares/authMiddleware');
const parseFormData=require('../middlewares/parseFormData');
const { userValidation } = require('../middlewares/userValidation');
router.post(EndPoints.Auth.login, auth.login);
router.post(EndPoints.Auth.register,upload.single("profilePic"),userValidation,parseFormData,auth.register);
router.get(EndPoints.Auth.protected, authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await UserController.getUserById(userId);
        if (!user) {
            return res.status(404).json({ error: "this user doas not exist" });
        }
        res.statusCode(201).json({
            message: 'Access granted',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                address: user.address,
                role: user.role,
                phone: user.phone
            }
        })
    } catch (error) {
    res.statusCode(500).json({error:error.message});
    }
});
module.exports = router;