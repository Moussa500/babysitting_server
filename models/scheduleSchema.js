
const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
    date: Date,
    location: String,
    scheduleID: String
});
module.exports = ScheduleSchema;