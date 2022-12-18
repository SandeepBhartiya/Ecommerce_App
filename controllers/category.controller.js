const db=require("../models")
const Category=db.category;

exports.createCategory=(req,res)=>{
    const categoryObj={
        name:req.body.name,
        description:req.body.description
    }
    Category.create(categoryObj).then(category=>{
        console.log("#### category created successfully ####");
        res.status(201).send(category);
    }).catch(err=>{
        console.log("error while creating category",err.message);
        res.status(500).send({
            message:"Internal server error while creating category"
        });
    })
}

exports.findAll=(req,res)=>{
    
    Category.findAll({
        where:{
            name:req.query.name
        }
    }).then(category=>{
        res.status(200).send(category)
    }).catch(err=>{
        console.log("Error while finding category",err.message);
        res.status(500).send({
            message:"Internal server error while finding category"
        })
    })
}

exports.findOne=(req,res)=>{
    
    Category.findOne({
        where:{
            id:req.params.id
        }
    }).then(category=>{
        res.status(200).send(category)
    }).catch(err=>{
        console.log("Error while finding category",err.message);
        res.status(500).send({
            message:"Internal server error while finding category"
        })
    })
}

exports.deleteCategory=(req,res)=>{
    
    Category.destroy({
        where:{
            id:req.params.id
        }
    }).then(category=>{
        console.log("#### category deleted successfully ####");
        res.status(200).send({
            message:"category deleted successfully"
        })
    }).catch(err=>{
        console.log("Error while finding category",err.message);
        res.status(500).send({
            message:"Internal server error while deleting category"
        })
    })
}


exports.updateCategory=(req,res)=>{
    const categoryObj={
        name:req.body.name,
        description:req.body.description
    }
    Category.update(categoryObj,{
        where:{
            id:req.params.id
        }
    }).then(category=>{
        Category.findByPk(req.params.id).then(category=>{
            console.log("#### category updated successfully ####");
            res.status(200).send(category)
        }).catch(err=>{
            res.status(500).send({
                message:"Internal error occur"
            })
        })
    }).catch(err=>{
        console.log("Error while updating category",err.message);
        res.status(500).send({
            message:"Internal server error while updating category"
        })
    })
}


