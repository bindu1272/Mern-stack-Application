const express = require('express');
const { signupUser,getUser,editUser,deleteUser,hardDeleteUser,signinUser } = require('../controllers/user.controller');
const router = express.Router();
const authenticate = require("../middleware/authentication");


router.post("/signup",signupUser);
router.get("/getuser/:email",authenticate,getUser);
router.put("/edituser",authenticate,editUser);
router.put('/deleteuser',authenticate,deleteUser);
router.delete('/harddeleteuser',authenticate,hardDeleteUser);
// router.get('/verifyUser/:token',verifyUser);
router.post("/signin",signinUser);
router.get("/isAuthenticated",authenticate,(req,res)=>{
    res.send({
        success : true,
        message:"Authenticated"
    })
})

module.exports = router;