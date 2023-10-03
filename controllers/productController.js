const Product=require("../models/productModel");
const asyncHandler=require("express-async-handler");
const slugify=require('slugify');

//create product
exports.createProduct=asyncHandler(async(req,res)=>{
    try{
        if(req.body.title){
            req.body.slug=slugify(req.body.title);
        }
        const newProduct=await Product.create(req.body);
        res.json(newProduct)
    }catch(error){
        throw new Error(error);
    }
})

//find product
exports.getProduct=asyncHandler(async(req,res)=>{
    const{id}=req.params;
    try{
        const findProduct=await Product.findById(id);
        return res.status(200).json({
            success:true,
            findProduct
        })
    }catch(error){
        throw new Error(error)
    }
})
//getAllProduct
exports.getAllproduct=asyncHandler(async(req,res)=>{
    try{
        const getAllProducts=await Product.find();
        res.status(200).json({
            success:true,
            getAllProducts
        })
    }catch(error){
        throw new Error(error)
    }
})
//productUpdate
exports.updateProduct=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    // console.log(id)
    try{
        if(req.body.title){
            req.body.slug=slugify(req.body.title);
        }
        const updatedProduct=await Product.findOneAndUpdate(
            {_id:id},
            req.body,
            {new: true,}
        )
        // console.log(updatedProduct)
        res.status(200).json({
            success:true,
            updatedProduct
        })
    }catch(error){
        throw new Error(error)
    } 
})
//delete product
exports.deleteProduct=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    // console.log(id)
    try{
        const deletedProduct=await Product.findOneAndDelete(
            {_id:id},
        )
        // console.log(updatedProduct)
        res.status(200).json({
            success:true,
            deletedProduct
        })
    }catch(error){
        throw new Error(error)
    } 
})