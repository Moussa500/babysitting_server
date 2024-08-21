const userModel = require("../models/userSchema");

module.exports.getAllUsers = async (req, res) => {
    try {
        const userList = await userModel.find();
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

module.exports.addUser = async (req, res) => {
    try {
        const { name, email, password, address, role } = req.body;
        const user = new userModel({
            name,
            email,
            password,
            address,
            role,
        });
        const userAdded = await user.save();
        res.status(201).json(userAdded);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.addUserBabySitter = async (req, res) => {
    try {
        const { name, email, password, address, availability, price, bio } = req.body;
        const role = "babysitter";
        const babysitter = new userModel({
            name,
            email,
            password,
            address,
            availability,
            price,
            bio,
            role,
            rating: 0,
        });
        const babysitterAdded = await babysitter.save();
        res.status(201).json(babysitterAdded);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.addUserParent = async (req, res) => {
    try {
        const { name, email, password, address, children } = req.body;
        const role = "parent";
        const parent = new userModel({
            name,
            email,
            password,
            address,
            children,
            role,
        });
        const parentAdded = await parent.save();
        res.status(201).json(parentAdded);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.updateUserBabySitter = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, price, bio, address } = req.body;

        const updatedUser = await userModel.findByIdAndUpdate(id, {
            name, email, phone, price, bio, address
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
        const { name, email, phone, children, address } = req.body;

        const updatedUser = await userModel.findByIdAndUpdate(id, {
            name, email, phone, children, address
        }, { new: true });

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
