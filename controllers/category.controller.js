const db=require("../models")
const Category=db.category;

exports.createCategory=(req,res)=>{
    const categoryObj={
        name:req.body.name,
        description:req.body.description
    }
    Category.create(categoryObj).then(category=>{
        console.log("\n #### category created successfully #### \n");
        res.status(201).send(category);
    }).catch(err=>{
        console.log("\n #### error while creating category #### \n",err.message);
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
        console.log("\n #### Error while finding category #### \n",err.message);
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
        console.log("\n #### Error while finding category #### \n",err.message);
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
        console.log("\n #### category deleted successfully #### \n");
        res.status(200).send({
            message:"category deleted successfully"
        })
    }).catch(err=>{
        console.log("\n #### Error while finding category #### \n",err.message);
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
            console.log("\n #### category updated successfully #### \n");
            res.status(200).send(category)
        }).catch(err=>{
            res.status(500).send({
                message:"Internal error occur"
            })
        })
    }).catch(err=>{
        console.log("\n #### Error while updating category #### \n",err.message);
        res.status(500).send({
            message:"Internal server error while updating category"
        })
    })
}


