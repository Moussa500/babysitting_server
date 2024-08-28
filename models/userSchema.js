const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        password: { type: String, required: true },
        status:{type:String,enum:["banned","unbanned"],required:true},
        profilePic:{type:String,default:"/images/user.png"},
        role: { type: String, enum: ["parent", "babySitter", "admin"], required: true },
        permissions: [{
            type: String, required: function () {
                return this.role === "admin";
            }
        }],
        availability: {
            type: [{
                date: {type:Date,required:true},
                location: {type:String,required:true},
            }], required: (function () {
                this.role === "babySitter";
            })
        },
        rating: { type: Number },
        price: {
            type: Number, required: function () {
                return this.role === "babySitter";
            },
        },
        bio: {
            type: String, required: function () {
                return this.role === "babySitter";
            },
        },
        children: {
            type: [{ gender: { type: String, required: true }, age: { type: Number, required: true } }], required: function () {
                return this.role === "parent";
            }
        },
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