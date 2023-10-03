const { generateToken } = require("../config/jwtToken");
const User=require("../models/userModels");
const asyncHandler=require('express-async-handler');
const { validateMongoDbId } = require("../utils/validateMongodbid");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt=require('jsonwebtoken');



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
        const refreshToken=await generateRefreshToken(findUser?.id);
        const updateUser=await User.findByIdAndUpdate(
            findUser.id,
            {
                refreshToken:refreshToken
            },
            {
                new:true
            }
        )
        res.cookie('refreshToken',refreshToken,{
            httpOnly:true, 
            maxAge:72*60*60*1000
        })
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
    validateMongoDbId(id);
    try{ 
        const user= await User.findById(id)
        // console.log(user);
        res.json(user)
    }catch(error){
        throw new Error(error)
    }
})
//update user
exports.updateUser=asyncHandler(async(req,res)=>{
    const{id}=req.user;
    validateMongoDbId(id);
    try{
        const updatedUser=await User.findByIdAndUpdate(
            id,
            {
                firstname:req?.body?.firstname,
                lastname: req?.body.lastname,
                email:req?.body?.email,
                mobile:req?.body?.email
            },
            {
                new:true
            }
        )
        res.json(updatedUser);
    }catch(error){
        throw new Error(error)

    }
})
//deleteUser
exports.deleteUser=asyncHandler(async(req,res)=>{
    const{id}=req.params;
    validateMongoDbId(id);
    try{
        const user= await User.findByIdAndDelete(id)
        console.log(user);
        res.json(user)
    }catch(error){
        throw new Error(error)
    }
})

//blockUser
exports.blockUser=asyncHandler(async(req,res)=>{
    const{id}=req.params;
    validateMongoDbId(id);
    console.log(93);
    try{
        const block=await User.findByIdAndUpdate(id,
            {
                isBlocked:true
            },
            {
                new:true
            }
        )
        res.json({
            messsage:"User Blocked"
        })
    }catch(error){
        throw new Error(error)
    }
})
//unblockUser
exports.unblockUser=asyncHandler(async(req,res)=>{
    const{id}=req.params;
    validateMongoDbId(id);
    console.log(123)
    try{
        const unblock=await User.findByIdAndUpdate(id,
            {
                isBlocked:false
            },
            {
                new:true
            }
        )
        res.json({
            messsage:"User Unblocked"
        })
    }catch(error){
        throw new Error(error)
    }
})
//handle refresh token
exports.handleRefreshToken=asyncHandler(async(req,res)=>{
    const cookie=req.cookies;
    if(!cookie?.refreshToken)throw new Error("No Refresh Token Present")
    refreshToken=cookie.refreshToken;
    const user=await User.findOne({refreshToken});
    if(!user)throw new Error('User not found or no refresh token present!')
    jwt.verify(refreshToken,process.env.JWT_SECRET,(err,decoded)=>{
        if(err||user.id!=decoded.id){
            throw new Error('There is something wrong with refresh token')
        }
        const accessToken=generateToken(user?._id);
        res.json({accessToken});
    });
    res.json(user)
})
//logout
exports.logout=asyncHandler(async(req,res)=>{
    const cookie=req.cookies;
    if(!cookie?.refreshToken)throw new Error("No Refresh Token Present")
    refreshToken=cookie.refreshToken;
    const user=await User.findOne({refreshToken});
    if(!user){
        res.clearCookie("refreshToken",{
            httpOnly:true,
            secure:true
        });
        return res.sendStatus(204)//forbidden
    }
    await User.findOneAndUpdate({refreshToken},{
        refreshToken:"",
    })
    res.clearCookie("refreshToken",{
        httpOnly:true,
        secure:true
    }); 
    res.sendStatus(204)//forbidden 
})


