
const {category}=require("../models")
// const category=db.category;
const validateProductRequest=(req,res,next)=>{
    try
    {   
        if(!req.body.name)
        {
            return res.status(400).send({
                message:"Failed!!! Product name is not provided"
            });
        }   
        else if(typeof req.body.name!=="string")
        {
            return res.status(400).send({
                message:"Failed!!!value provided is not in valid Formate(String)"
            })
        }

        if(!req.body.description)
        {
            return res.status(400).send({
                message:"Failed!!! Product description is not provided"
            });
        }
        else if(typeof req.body.description!=="string")
        {
            return res.status(400).send({
                message:"Failed!!!value provided is not in valid Formate(String)"
            })
        }

        if(!req.body.cost || req.body.cost<=0)
        {
            return res.status(400).send({
                message:"Failed!!! Product cost is not provided or Invalid value is provided"
            });
        }
        else if(typeof req.body.cost!=="number")
        {
            return res.status(400).send({
                message:"Failed!!!value provided is not in valid Formate(Number)"
            })
        }

        if(req.body.categoryId)
        {
            category.findByPk(req.body.categoryId).then(category=>{
                console.log("CategoryId:",category)
                if(!category)
                {
                    return res.status(400).send({
                        message:"Category id is not provided"
                    });
                   
                }
                next();
            })
        }
        else
        {
            return res.status(400).send({
                message:"Category id  is not provided"
            });
          
        }
      
    }
    catch(err)
    {
        console.log(" error while validating product".err.message);
        res.status(500).send({
            message:"Failed!!! Internal server error "
        });
    }
}

const updateProduct=(req,res,next)=>{
    try
    {
        if(req.body.name)
        {
            if(typeof req.body.name!=="string")
            {
                return res.status(400).send({
                    message:"Failed!!!value provided is not in valid Formate(String)"
                })
            }
        }

        if(req.body.description)
        {
            if(typeof req.body.description!=="string")
            {
                return res.status(400).send({
                    message:"Failed!!!value provided is not in valid Formate(String)"
                });
            }
        }

        if(req.body.cost)
        {
            if(typeof req.body.cost!=="number")
            {
                return res.status(400).send({
                    message:"Failed!!!value provided is not in valid Formate(String)"
                });
            }
        }
        next();
    }
    catch(err)
    {
        console.log("#### ####",err.message);
        return res.status(500).send({
            message:"Internal server error while updating product"
        })
    }
}

const productValidation={
    validateProductRequest:validateProductRequest,
    updateProduct:updateProduct
}

module.exports=productValidation