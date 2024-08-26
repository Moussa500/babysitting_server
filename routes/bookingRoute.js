const express=require('express');
var route=express.Router();
const bookingController=require('../controller/bookingController');
const EndPoints=require('../constants/endPoints');
route.post(EndPoints.booking.bookSitter,bookingController.bookSitter);
route.delete(EndPoints.booking.cancelBooking,bookingController.cancelBooking);
module.exports=route;
