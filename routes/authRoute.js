const express=require('express');
const router=express.Router();
const{createUser, loginuserCtrl, getAllUser, getUser}=require("../controllers/userCtrl")


router.post('/register',createUser);
router.post('/login',loginuserCtrl);
router.get('/all-users',getAllUser);
router.get('/:id',getUser);






module.exports=router;