const { model } = require("mongoose");
const userModel=require("../models/userSchema");
model.exports.getAllUsers=async(req,res)=>{
    try {
        const userList=await userModel.find();
        res.status(200).json({userList});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};
