const express=require('express');
var route=express.Router();
const bookingController=require('../controller/bookingController');
const EndPoints=require('../constants/endPoints');
const {protect} = require('../middlewares/authMiddleware');
route.post(EndPoints.booking.bookSitter,protect,bookingController.bookSitter);
route.delete(EndPoints.booking.cancelBooking,protect,bookingController.cancelBooking);
module.exports=route;
