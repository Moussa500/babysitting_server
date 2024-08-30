const userModel = require('../models/userSchema');
const bookingModel = require("../models/bookingSchema");
const user = require('../models/userSchema');

module.exports.bookSitter = async (req, res) => {
    try {
        const { parentID, babySitterID } = req.body;
        const booking = new bookingModel({
            parentID,
            babySitterID,
            date: new Date(),
            status: "pending",
        });
        const bookingAdded = booking.save();
        res.status(201).json({ success: "booking added succeffully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports.cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const deleteBooking = await bookingModel.findByIdAndDelete(bookingId);
        if (!deleteBooking) {
            throw new Error("User not found");
        }
        res.status(201).json({ message: "booking canceled successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports.updateBookingStatus=async(req,res)=>{
    try {
        const {bookingId,status}=req.body;
        revokedBooking= await bookingModel.findByIdAndUpdate(bookingId,{
            status,
        });
        res.status(201).json({message:'status updated successfully'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
module.exports.getBookingByParent=async(req,res)=>{
    try {
        const {parentID}=req.params;
        const bookingList=await bookingModel.find({parentID});
        res.status(201).json({bookingList});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}
module.exports.getBookingByBabySitter=async(req,res)=>{
    try {
        const {babySitterID}=req.params;
        const bookingList=await bookingModel.find({babySitterID});
        res.status(201).json({bookingList});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}