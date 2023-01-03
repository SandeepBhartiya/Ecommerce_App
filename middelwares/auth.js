const jwt=require("jsonwebtoken");
const secretKey=require("../configs/secret.config");
const {role}=require("../models");

const db=require('../models');
const User=db.user;

const jwtVerify=(req,res,next)=>{
    const token=req.headers["x-access-token"];

    if(!token)
    {
        return res.status(400).send({
            message:"Failed!!! user doesn't provide token"
        });
    }
    jwt.verify(token,secretKey.secret,(err,decoded)=>{
        if(err)
        {
            return res.status(400).send({
                message:"Failed!!! Invalid token"
            });
        }
        req.userId=decoded.id
        next();
    })
}

const isAdmin=(req,res,next)=>{
    User.findByPk(req.userId).then(user=>{
        user.getRoles().then(roles=>{
            for(let i=0;i<roles.length;i++)
            {
                if(roles[i].name=='admin')
                {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message:"Only Admin can access this endpoint"
            });
            return;
        })
    })
}

const authValidaton={
    jwtVerify:jwtVerify,
    isAdmin:isAdmin
};

module.exports=authValidaton