const userModel = require('../models/userSchema');

module.exports.getPermissions = async (req, res) => {
    try {
        const { id } = req.params;
        adminPermissions = await userModel.findById(id).select('permissions');
        res.status(200).json({ adminPermissions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports.assingPermissions = async (req, res) => {
    try {
        const { email } = req.params;
        const { permission } = req.body;
        const admin = await userModel.findOneAndUpdate({ email }, {
            $addToSet: {
                permissions: permission
            }
        });
        res.status(201).json({ admin });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports.banAndUnbanUser = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await userModel.findById(id);
        let status = user.status === "banned" ? "unbanned" : "banned";
        const updatedUser = await userModel.findByIdAndUpdate(id, {
            status
        });
        res.status(201).json({ message: `User has been ${status}`});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}