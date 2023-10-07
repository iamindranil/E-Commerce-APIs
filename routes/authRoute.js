const express=require('express');
const router=express.Router();
const{
    createUser, 
    loginuserCtrl, 
    getAllUser, 
    getUser, 
    deleteUser, 
    updateUser,
    blockUser,
    unblockUser,
    handleRefreshToken,
    logout,
    updatePassword,
    forgotPasswordToken,
    resetPassword,
}=require("../controllers/userCtrl");
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');


router.post('/register',createUser);
router.post('/forgot-password-token',forgotPasswordToken)
router.post('/reset-password-token',resetPassword)
router.post('/login',loginuserCtrl);
router.get('/all-users',getAllUser);
router.get("/refresh",handleRefreshToken);
router.get('/logout',logout);
router.get('/:id',authMiddleware,isAdmin,getUser);
router.delete('/:id',deleteUser);
router.put("/edit-user",authMiddleware,updateUser);
router.put('/block-user/:id',authMiddleware,isAdmin,blockUser);
router.put("/unblock-user/:id",authMiddleware,isAdmin,unblockUser);
router.put("/password",authMiddleware,updatePassword)




module.exports=router;