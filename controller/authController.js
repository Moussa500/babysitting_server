const express=require('express');
const User=require('../models/userSchema');
const usersController=require('./usersController');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
//User registration

module.exports.register=async (req,res)=>{
try {
    const {name,email,password,address,role,phone}=req.body;
    const existingUser=await userModel.findOne({email});
    if(existingUser){
        return res.status(400).json({message: "User already exists"});
    }
    const userAdded=await usersController.addUser({
        name,
        email,
        password,
        address,
        role,
        phone
    });
    res.status(201).json({message:'User registred successfully'});
} catch (error) {
    res.status(500).json({error:'Registration failed'});
}
}

//user login
module.exports.login=async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({error: 'this user doas not exist'});
        }
        const passwordMatch=await bcrypt.compare(password,user.password);
        if(!passwordMatch){
            return res.status(401).json({error:'password doas not match'});
        }
    } catch (error) {
        res.status(500).json({error:'Login Failed'});
    }
}