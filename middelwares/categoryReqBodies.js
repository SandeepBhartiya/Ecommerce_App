const isvalidcategory=(req,res,next)=>{
    try
    {
        if(!req.body.name)
        {
            return res.status(400).send({
                message:"Failed!!!! Name is not provided"
            });
        }
        else if(typeof req.body.name!=="string")
        {
            return res.status(400).send({
                message:"Failed!!!! Value provide is not in valid Formate(String)"
            });
        }

        if(!req.body.description)
        {
            return res.status(400).send({
                message:"Failed!!!! Description is not provided"
            })
        }
        else if(typeof req.body.description!=="string")
        {
            return res.status(400).send({
                message:"Failed!!!! Value provide is not in valid Formate(String)"
            })
        }
        next();
    }
    catch(err)
    {
        console.log(" error while validating category".err.message);
        res.status(500).send({
            message:"Failed!!! Internal server error "
        });
    }
}

const updateCategory=(req,res,next)=>{
    try
    {
        if(req.body.name)
        {
            if(typeof req.body.name!=="string")
            {
                return res.status(400).send({
                    message:"Failed!!!! Value provide is not in valid Formate(String)"
                });
            }
        }

        if(req.body.description)
        {
            if(typeof req.body.description!=="string")
            {
                return res.status(400).send({
                    message:"Failed!!!! Value provide is not in valid Formate(String)"
                });
            }
        }
        next();
    }
    catch(err)
    {
        console.log("#### error while updating category ####",err.message);
        return res.status(500).send({
            message:"Internal server error while updating category"
        })
    }
}

const categoryValidation={
    isvalidcategory:isvalidcategory,
    updateCategory:updateCategory
}

module.exports=categoryValidation