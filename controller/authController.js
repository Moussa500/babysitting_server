const User = require('../models/userSchema');
const usersController = require('./usersController');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const secretKey = process.env.jwt_secret_key;
module.exports.register = async (req, res) => {
    try {
        const { name, email, password, address, role, phone, availability, price, bio, children, permissions } = req.body;
        const profilePic = req.files && req.files.profilePic ? req.files.profilePic[0].path : null;
        const cv = req.files && req.files.cv ? req.files.cv[0].path : null;
        const userAdded = await usersController.addUser({
            name,
            email,
            password,
            address,
            role,
            phone,
            availability,
            price,
            bio,
            children,
            permissions,
            profilePic,
            cv,
        });
        const token = jwt.sign({ userId: userAdded._id, email: userAdded.email, name: userAdded.name, phone: userAdded.phone, role: userAdded.role, address: userAdded.address, profilePic: userAdded.profilePic }, secretKey, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
        console.log({ error });
        res.status(500).json({ error: error.message });
    }
}
//user login
module.exports.login = async (req, res) => {
    try {
        console.log({ secretKey });
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: '"this user does not exist' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'password doas not match' });
        }
        user.status === "banned" ? res.status(403).json({ Error: "this account is temporary banned" }) : token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login Failed' });
    }
}