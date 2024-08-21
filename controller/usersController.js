const { model } = require("mongoose");
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
module.exports.addUserBabbySitter = async (req, res) => {
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
            role,
            rating: 0,
        });
        const babysitterAdded = await babysitter.save();
        res.status(201).json(babysitterAdded);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports.updateUserBabySitter = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, price, bio } = req.params;
        const checkIfUserExists = await userModel.findById(id);
        if (!checkIfUserExists) {
            throw new Error("User not found");
        }
        const updateUser = await userModel.findByIdAndUpdate(id, { $set: { nom, prenom, phone, price, bio } });
        res.status(201).json({ message: error.message });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
