const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");


const secretKey=require("../configs/secret.config")
const db=require("../models")
const User=db.user;
const Role=db.role;
const Op=db.Sequelize.Op;

exports.singUp=(req,res)=>{
    
    const userObj={
        username:req.body.username,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password)
    };

    User.create(userObj).then(user=>{
        console.log("User Created")
        // if(req.body.roles)
        // {
        //     console.log("Roles",req.body.roles)
        //     Role.findAll({
        //         where:{
        //             name:{
        //                 [Op.or]:req.body.roles
        //             }
        //         }\
        console.log("1");
        if (req.body.roles) {
            // I need to first have the Roles created in the system
            console.log("2");
            // I need to check if the desired roles match with the supported roles
            Role.findAll({
                where: {
                    name: req.body.roles
                }
            }).then(roles=>{
                console.log("3");
                console.log("roles",roles);
                user.setRoles(roles).then(()=>{
                    console.log("registration completed");
                    res.status(201).send({
                        message:"User successfully register"
                    })
                })
            })
        }else{
            console.log("4");
            user.setRoles([1]).then(()=>{
                console.log("registered completed ")
                res.status(201).send({
                    message:"User successfully Register"
                })
            })
        }
    }).catch(err=>{
        console.log("5")
        console.log("Error while creating user",err.message);
        res.status(500).send({
            message:"Some Internal Error "
        })
    })

}

exports.signIn=(req,res)=>{
  
    User.findOne({
        where:{
            email:req.body.email
        }
    }).then(user=>{
        if(!user)
        {
            res.status(404).send({
                message:"User Not Found"
            })
            return;
        }
        const token=jwt.sign({id:user.id},secretKey.secret,{
            expiresIn:6000
        });

        res.status(200).send({
            username:user.username,
            email:user.email,
            password:user.password,
            token:token
        });
    }).catch(err=>{
        console.log("Error while singIn",err.message);
        res.status(500).send({
            message:"Internal Server Error"
        });
    })
}