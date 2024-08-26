const mongoose=require('mongoose');

const bookingSchema=new mongoose.Schema(
    {
        parentID:{type:String,required:true},
        babySitterID:{type:String,required:true},
        date:{type:Date,required:true},
        status:{type:String,enum:["pending","accepted","rejected","expired"],required:true},
    }
);
const booking = mongoose.model("booking", bookingSchema);
module.exports = booking;