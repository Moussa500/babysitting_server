const express=require('express');
const User=require('../models/userSchema');
const usersController=require('./usersController');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const crypto=require('crypto');
const secretKey=crypto.randomBytes(64).toString('hex');
//User registration
module.exports.register=async (req,res)=>{
try {
    const { name, email, password, address, role, phone, availability, price, bio, children,permissions } = req.body;
    const userAdded=await usersController.addUser({
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
    });
    const token=jwt.sign({userId:user._id},secretKey,{expiresIn:'1h'});
    res.status(201).json({token});
} catch (error) {
    console.log({error});
    res.status(500).json({error:'Registration failed'});
}
}
//user login
module.exports.login=async (req,res)=>{
    try {
        console.log({secretKey});
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({error: '"this user does not exist'});
        }
        const passwordMatch=await bcrypt.compare(password,user.password);
        if(!passwordMatch){
            return res.status(401).json({error:'password doas not match'});
        }
        const token=jwt.sign({userId:user._id},secretKey,{expiresIn:'1h'});
        res.status(201).json({token});
    } catch (error) {
        res.status(500).json({error:'Login Failed'});
    }
}