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
}=require("../controllers/userCtrl");
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');


router.post('/register',createUser);
router.post('/login',loginuserCtrl);
router.get('/all-users',getAllUser);
router.get("/refresh",handleRefreshToken);
router.get('/logout',logout);
router.get('/:id',authMiddleware,isAdmin,getUser);
router.delete('/:id',deleteUser);
router.put("/edit-user",authMiddleware,updateUser);
router.put('/block-user/:id',authMiddleware,isAdmin,blockUser);
router.put("/unblock-user/:id",authMiddleware,isAdmin,unblockUser);





module.exports=router;