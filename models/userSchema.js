const mongoose = require("mongoose");
const ScheduleSchema = require('./userSchema');
const ChildrenSchema=require('./childrenSchema');
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
    {
        userID: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["parent", "babySitter", "admin"], required: true },
        permissions: [{ type: String }],
        availability: [ScheduleSchema],
        rating: { type: Number },
        price: { type: Number },
        bio: { type: String },
        children: [ChildrenSchema]
    },
    { timestamps: true }
);
userSchema.pre("save", async function (next) {
    try {
        const salt = await bcrypt.genSalt();
        const user = this;
        user.password = await bcrypt.hash(user.password, salt);
        user.state = false;
        next();
    } catch (error) {
        next(error);
    }
});

const user = mongoose.model("user", userSchema);
module.exports = user;