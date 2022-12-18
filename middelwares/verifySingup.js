const bcryprt=require('bcryptjs');
const { user } = require('../models');
const db=require('../models');
const User=db.user;
const Roles=db.ROLES;

const checkDuplicateEmails=(req,res,next)=>{
        User.findOne({
            where:{
                username:req.body.username
            }
        }).then(user=>{
            if(user)
            {
                return res.status(400).send({
                    message:"Failed!!! Username already exist"
                })
            }

            User.findOne({
                where:{
                    email:req.body.email
                }
            }).then(email=>{
                if(email)
                {
                    return res.status(400).send({
                        message:"Failed!!! Email already exist"
                    })
                }
                next();
            })
        })

}

const checkRolesExisted=(req,res,next)=>{
    if(req.body.roles)
    {
        for(let i=0;i<req.body.roles;i++)
        {
            if(!Roles.includes(req.body.roles[i]))
            {
                return res.status(400).send({
                    message:"Failed!!! Roles doesn't Exist"
                })
            }
        }
    }
    next();
}
const isUserExist=(req,res,next)=>{
    User.findOne({
        where:{
            email:req.body.email
        }
    }).then(user=>{
        if(!user)
        {
            return res.status(400).send({
                message:"Failed!!! user doesn't Exist"
            })
        }
        next();
    }).catch(err=>{
        console.log("#### error while validating user  ####",err.message);
        res.status(500).send({
            message:"User doesn't Exist"
        })
    })
}

const isvalidPassword=(req,res,next)=>{
    User.findOne({
        where:{
            email:req.body.email
        }
    }).then(user=>{
        let password=req.body.password;
        const isvalid=bcryprt.compareSync(password.toString(),user.password.toString())
        if(!isvalid)
        {
            return res.status(400).send({
                message:"Failed!!! Invalid password provided"
            });
        }
        next();
    }).catch(err=>{
        console.log("#### error while validating user  ####",err.message);
        res.status(500).send({
            message:"Internal server error while validating user"
        })
    })
}

const verifySingup={
    checkDuplicateEmails:checkDuplicateEmails,
    checkRolesExisted:checkRolesExisted,
    isvalidPassword:isvalidPassword,
    isUserExist:isUserExist
};

module.exports=verifySingup