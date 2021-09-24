require('dotenv').config();
const jwt = require('jsonwebtoken');
const authenticate = (req,res,next)=>{
   let token = req.headers.authorization;
    if(typeof token !== "undefined"){
        let finalToken = token.split(" ")[1];
        jwt.verify(finalToken,process.env.SECRET_KEY,(err,user)=>{
            if(!err){
                req.user = user;
                next();
            }else{
                res.send({success:false,message:"unauthorized"});
            }
        })
    }else{
        res.send({success: false,message:"unauthorized"});
    }
}
module.exports = authenticate;