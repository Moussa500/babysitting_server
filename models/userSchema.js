const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const userSchema=new mongoose.userSchema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true},
        phone:{type:String,required:true},
        role:{type:String,enum:["admin","parent","babysitter"],required:true},
        state:{type:Boolean},
    },
    {timestamps:true}
);
userSchema.pre("save",async function(next){
    try {
        const salt=await bcrypt.genSalt();
        const user=this;
        user.password=await bcrypt.hash(user.password,salt);
        user.state=false;
        next();
    } catch (error) {
        next(error);        
    }
});
const user=mongoose.Mongoose.model("user",userSchema);
module.exports=user;