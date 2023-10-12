const express=require('express');
const { createProduct, getProduct, getAllproduct, updateProduct, deleteProduct, addToWishList } = require('../controllers/productCtrl');
const router=express.Router();
const {isAdmin,authMiddleware}=require('../middlewares/authMiddleware')

router.post('/',authMiddleware,isAdmin,createProduct);
router.get('/:id',authMiddleware,isAdmin,getProduct);
router.put('/:id',authMiddleware,isAdmin,updateProduct);
router.delete('/:id',authMiddleware,isAdmin,deleteProduct);
router.get('/',getAllproduct);
router.post('/wishlist',authMiddleware,addToWishList);









module.exports=router
