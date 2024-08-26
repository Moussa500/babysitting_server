const userModel = require("../models/userSchema");

module.exports.getAllUsers = async (req, res) => {
    try {
        const { role } = req.body;
        let userList = [];
        switch (role) {
            case "admin":
            case "parent":
            case "babySitter":
                userList = await userModel.find({ role });
                break;

            default:
                userList = await userModel.find();
                break;
        }

        res.status(200).json({ userList });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.searchUserByName = async (req, res) => {
    try {
        const { name } = req.body;
        const usersList = await userModel.find({
            name: { $regex: name, $options: "i" },
        });
        res.status(200).json({ usersList });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports.updateUserAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, phone, permission } = req.body;
        const updatedUser = await userModel.findByIdAndUpdate(id, {
            name, email, password, phone,
        },)
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
module.exports.addUser = async (userData) => {
    const { name, email, password, role, phone, address } = userData;
    let additionalFields = {};
    switch (role) {
        case 'parent':
            const { children } = userData;
            additionalFields = {
                address,
                children,
            };
            break;

        case 'babySitter':
            const { availability, price, bio } = userData;
            additionalFields = {
                availability,
                price,
                bio,
            };
            break;

        case 'admin':
            const { permissions } = userData;
            additionalFields = {
                permissions,
            };
            break;

        default:
            throw new Error('Invalid user role');
    }
    const user = new userModel({
        name,
        email,
        password,
        role,
        address,
        phone,
        ...additionalFields,
    });
    const userAdded = await user.save();
    return userAdded;
};
module.exports.updateUserBabySitter = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, price, bio, date, location, address } = req.body;

        const updatedUser = await userModel.findByIdAndUpdate(id, {
            name, email, phone, price, bio, address,
            $addToSet: {
                availability: {
                    date, location
                }
            }
        }, { new: true });

        if (!updatedUser) {
            throw new Error("User not found");
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports.updateUserParent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, age, gender, address } = req.body;
        const updatedUser = await userModel.findOneAndUpdate({ _id: id }, {
            name, email, phone, address, $push: {
                children: { age, gender },
            }
        }, {
            new: true
        });
        if (!updatedUser) {
            throw new Error("User not found");
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await userModel.findByIdAndDelete(id);

        if (!deletedUser) {
            throw new Error("User not found");
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
