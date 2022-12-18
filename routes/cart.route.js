const cartController=require('../controllers/cart.controller')
const {authValidaton}=require('../middelwares')
module.exports=(app)=>{
    app.post("/ecomm/api/v1/carts",[authValidaton.jwtVerify],cartController.createCart);
    app.get("/ecomm/api/v1/carts/:id",[authValidaton.jwtVerify],cartController.getCarts);
    app.put("/ecomm/api/v1/carts/:id",[authValidaton.jwtVerify],cartController.updateCart);
}