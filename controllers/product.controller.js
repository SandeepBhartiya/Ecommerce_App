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
        console.log("\n #### Product Created successfully #### \n");
        res.status(201).send({
            message:"Product Successfully Created"
        });
    }).catch(err=>{
        console.log("\n #### Error while creating product #### \n",err.message);
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
        console.log("\n #### Error while searching product ####",err.message);
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
        console.log("\n #### Error while finding product #### \n",err.message);
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
        console.log("\n #### product Delete successfully #### \n")
        res.status(200).send({
            message:"product Delete successfully"
        })
    }).catch(err=>{
        console.log("\n #### Error while deleting products #### \n",err.message);
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
            console.log(`\n #### update successfully ${product.name} product #### \n`)
            res.status(200).send(product);
        }).catch(err=>{
            res.status(500).send({
                message:"Internal  Error occur"
            })
        })
            
        
    }).catch(err=>{
        console.log("\n #### Error while updating #### \n",err.message);
        res.status(500).send({
            message:"Internal Server Error"
        })
    })
}