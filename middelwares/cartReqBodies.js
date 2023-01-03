const cartValidation=(req,res,next)=>{
    if(!req.body.cost )
    {
        return res.status(400).send({
            message:"Failed!!! cost is not provided"
        })
    }
    else if( req.body.cost<=0)
    {
        return res.status(400).send({
            message:"Failed!!! Invalid cost is provided"
        })
    }
    else if(typeof req.body.cost!="number")
    {
        return res.status(400).send({
            message:"Failed!!! cost provided is invalid formate(Number)"
        });
    }

    next();
}   


const cartReqBodies={
    cartValidation:cartValidation
}

module.exports=cartReqBodies