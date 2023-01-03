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
        if (req.body.roles) {
            Role.findAll({
                where: {
                    name: req.body.roles
                }
            }).then(roles=>{
                user.setRoles(roles).then(()=>{
                    console.log("\n #### Registration Completed #### \n");
                    res.status(201).send({
                        message:"User successfully register"
                    })
                })
            })
        }else{
            user.setRoles([1]).then(()=>{
                console.log("\n #### Registered Completed #### \n")
                res.status(201).send({
                    message:"User successfully Register"
                })
            })
        }
    }).catch(err=>{
        console.log("\n #### Error while creating user #### \n",err.message);
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
      
        const token=jwt.sign({id:user.id},secretKey.secret,{
            expiresIn:6000
        });

        console.log("\n #### User successfully Login #### \n");
        
        res.status(200).send({
            username:user.username,
            email:user.email,
            password:user.password,
            token:token
        });
    }).catch(err=>{
        console.log("\n #### Error while user singIn #### \n",err.message);
        res.status(500).send({
            message:"Internal Server Error"
        });
    })
}