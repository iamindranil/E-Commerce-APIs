const { generateToken } = require("../config/jwtToken");
const User=require("../models/userModels");
const asyncHandler=require('express-async-handler');

//register
exports.createUser= asyncHandler(async (req,res)=>{
    const email=req.body.email;
    const findUser=await User.findOne({email:email});
    if(!findUser){
        //create new user
        const newUser=await User.create(req.body);
        res.json(newUser)
    }else{
        throw new Error("User Already Exists");
    }
})
//login
exports.loginuserCtrl=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    //check user exists or not
    const findUser=await User.findOne({email});
    if(findUser && await findUser.isPasswordMatched(password)){
        res.json({
            _id:findUser?.firstname,
            lastname:findUser?.lastname,
            email:findUser?.email,
            mobile:findUser?.mobile,
            token:generateToken(findUser?._id)
        })
    }else{
        throw new Error("Invalid Credentials");
    }
})
//getAllUsers
exports.getAllUser=asyncHandler(async(req,res)=>{
    try{
        const getUsers=await User.find();
        res.json({
            getUsers
        })
    }catch(error){
        throw new Error(error);
    }
})
//getSingleUser
exports.getUser=asyncHandler(async(req,res)=>{
    const{id}=req.params;
    try{
        const user= await User.findById(id)
        console.log(user);
        res.json(user)
    }catch(error){
        throw new Error(error)
    }
})

