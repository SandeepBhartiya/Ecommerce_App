const db=require("../models");
const Product=db.product

exports.createProduct=(req,res)=>{
    const productobj={
        name:req.body.name,
        description:req.body.description,
        cost:req.body.cost,
        categoryId:req.body.categoryId
    }

    Product.create(productobj).then(product=>{
        console.log("#### Product Created successfully ####");
        res.status(201).send({
            message:"Product Successfully Created"
        });
    }).catch(err=>{
        console.log("Error while creating product",err.message);
        res.status(500).send({
            message:"Internal Server Error"
        })
    })
}


exports.findAll=(req,res)=>{
    Product.findAll({
        where:{
           name:req.query.name
        }
    }).then(user=>{
        res.status(200).send(user)
    }).catch(err=>{
        console.log("Error while searching ",err.message);
        res.status(500).send({
            message:"Internal Server Error"
        })
    })
}

exports.findOne=(req,res)=>{
    Product.findOne({
        where:{
            id:req.params.id
        }
    }).then(product=>{
        res.status(200).send(product)
    }).catch(err=>{
        console.log("Error while finding product",err.message);
        res.status(500).send({
            message:"Server Internal Error"
        })
    })
}

exports.deleteProduct=(req,res)=>{
    Product.destroy({
        where:{
            id:req.params.id
        }
    }).then(result=>{
        console.log("#### product Delete successfully ####")
        res.status(200).send({
            message:"product Delete successfully"
        })
    }).catch(err=>{
        console.log("Error while deleting products",err.message);
        res.status(500).send({
            message:"Internal Server Error"
        })
    })
}

exports.updateProduct=(req,res)=>{
    const product={
        name:req.body.name,
        description:req.body.description,
        cost:req.body.cost
    }

    Product.update(product,{
        where:{
            id:req.params.id
        }
    }).then(updateProduct=>{
        Product.findByPk(req.params.id).then(product=>{
            console.log(` update successfully ${product.name} product`)
            res.status(200).send(product);
        }).catch(err=>{
            res.status(500).send({
                message:"Internal  Error occur"
            })
        })
            
        
    }).catch(err=>{
        console.log("Error while updating",err.message);
        res.status(500).send({
            message:"Internal Server Error"
        })
    })
}