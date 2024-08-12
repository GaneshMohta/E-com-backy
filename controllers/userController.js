const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const {v4 : uuidv4} = require('uuid');


exports.login=async (req,res)=>{
    try{
        const {email , password} = req.body;
        const user = await User.findOne({email});
        if(!user){
           return res.status(400).json("Invalid email or Password")
        }
        const isMatch =await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json("Invalid email or Password");
        }
        const token = jwt.sign({email,user_id :user._id }, "qw234asd",{
            expiresIn: "1h",
        });
        return res.status(200).json(token);
    }
    catch(e){
        console.log(e);
    }
}

exports.createUser=async(req,res)=>{
    const {name,email,password}=req.body;
    const user = await User.findOne({email});

    try{
    const users= new User({
        user_id : uuidv4(),
        name,
        email,
        password
    })

    await users.save();
    res.status(201).json("user account created");
    }
    catch(e){
        console.log(e);
        res.status(500).json("server error");
    }
}
