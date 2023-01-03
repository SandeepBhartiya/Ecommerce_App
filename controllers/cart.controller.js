
const db=require('../models');
const Notification=require('../utils/Notification');
const User=db.user;
const Cart=db.cart;
const Product=db.product;

exports.createCart=(req,res)=>{
    const cartObj={
        userId:req.userId
    }

    Cart.create(cartObj).then(cart=>{
        console.log("\n #### Cart successfully Created #### \n")
        res.status(201).send(cart)
    }).catch(err=>{
        console.log("\n #### Error while creating cart ####\n",err.message);
        res.status(500).send({
            message:"Internal server error while creating cart"
        })
    })
}

exports.updateCart=(req,res)=>{

    Cart.findByPk(req.params.id).then(cart=>{
        User.findByPk(cart.userId).then(user=>{
            var productIds=req.body.productIds;
            Product.findAll({
                where:
                {
                    id:productIds
                }
            }).then(products=>{
                if(!products)
                {
                    return res.status(400).send({
                        message:"Products trying to add doesn't exist"
                    });
                    
                }
                cart.setProducts(products).then(()=>{
                    console.log("\n #### Products successfully added to the cart #### \n");
                    var cost=0;
                    var productsSelected=[];
                    cart.getProducts().then(cartProducts=>{
                        for(let i=0;i<cartProducts.length;i++)
                        {
                            productsSelected.push({
                                id:cartProducts[i].id,
                                name:cartProducts[i].name,
                                cost:cartProducts[i].cost,
                            });
                            cost=cost+cartProducts[i].cost;
                        } 
                        cart.cost+=cost;
                        cart.save();
                        Notification(`Product created with id:${cart.id}`,`total Amount to be paid for Product Purchase is ${cost} Rs`,`${user.email}`,"Ecommerce App");
                        console.log("\n #### Cart successfully Updated #### \n")
                        res.status(200).send({
                            id:cart.id,
                            productsSelected:productsSelected,
                            cost:cost
                        });
                    });
                });
            });
        }).catch(err=>{
                console.log("### user not find ###",err.message)
                });
    }).catch(err=>{
        console.log("\n #### error while updating Cart #### \n",err.message);
        res.status(500).send({
            message:"Internal server error while updating Cart"
        })
    })
}


exports.getCarts=(req,res)=>{
    const cartId=req.params.id;
    Cart.findByPk(cartId).then(cart=>{
        var cost=0;
        var productsSelected=[];
        cart.getProducts().then(cartProducts=>{
            for(let i=0;i<cartProducts.length;i++)
            {
                productsSelected.push({
                    id:cartProducts[i].id,
                    name:cartProducts[i].name,
                    cost:cartProducts[i].cost,
                });
                cost=cost+cartProducts[i].cost
            }
            res.status(200).send({
                id:cart.id,
                productsSelected:productsSelected,
                cost:cost
            });
        });

    }).catch(err=>{
        console.log("\n #### Errror while getting cart products ####\n",err.message);
        res.status(500).send({
            message:"Internal server error while getting cart products"
        })
    })
}