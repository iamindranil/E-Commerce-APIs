const express=require('express');
const { createProduct, getProduct, getAllproduct, updateProduct, deleteProduct } = require('../controllers/productController');
const router=express.Router();
const {isAdmin,authMiddleware}=require('../middlewares/authMiddleware')

router.post('/',authMiddleware,isAdmin,createProduct);
router.get('/:id',authMiddleware,isAdmin,getProduct);
router.put('/:id',authMiddleware,isAdmin,updateProduct);
router.delete('/:id',authMiddleware,isAdmin,deleteProduct);
router.get('/',getAllproduct);








module.exports=router
