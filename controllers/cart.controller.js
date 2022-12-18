const db=require('../models');
const Cart=db.cart;
const Product=db.product;

exports.createCart=(req,res)=>{
    const cartObj={
        userId:req.userId
    }
    Cart.create(cartObj).then(cart=>{
        res.status(201).send(cart)
    }).catch(err=>{
        console.log("Error while creating cart");
        res.status(500).send({
            message:"Internal server error while creating cart"
        })
    })
}

exports.updateCart=(req,res)=>{
    Cart.findByPk(req.params.id).then(cart=>{
        var productIds=req.body.productIds;
        Product.findAll({
            where:{
                id:productIds
            }
        }).then(products=>{
            if(!products)
            {
                res.status(400).send({
                    message:"Products trying to add doesn't exist"
                });
                return;
            }
            cart.setProducts(products).then(()=>{
                console.log("Products successfully added to the cart");
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
                    res.status(200).send({
                        id:cart.id,
                        productsSelected:productsSelected,
                        cost:cost
                    })
                })
               
            })
        })
    }).catch(err=>{
        console.log("error while updating Cart",err.message);
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
        console.log("Errror while getting cart products",err.message);
        res.status(500).send({
            message:"Internal server error while getting cart products"
        })
    })
}