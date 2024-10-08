const moongose =require('mongoose');
const bcrypt = require("bcrypt");

const userSchema= moongose.Schema({
    user_id:String,
    name:{
        type:String,
        require:[true,"Name is required"]
    },
    email:{
        type:String,
        require:[true,"email is required"]
    },
    password:{
        type:String,
        require:[true,"Password is required"]
    },
})

userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        return next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next()

})

const Users=new moongose.model("user",userSchema);

module.exports = Users;
