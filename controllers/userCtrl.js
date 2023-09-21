const User=require("../models/userModels");



exports.createUser= async (req,res)=>{
    const email=req.body.email;
    const findUser=await User.findOne({email:email});
    if(!findUser){
        //create new user
        const newUser=await User.create(req.body);
        res.json(newUser)
    }else{
        //user already exists
        res.json({
            msg:"User Already Exists",
            success:false
        })
    }
}

