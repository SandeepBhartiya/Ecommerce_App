const productController=require("../controllers/product.controller");
const {authValidaton,productValidation}=require("../middelwares")

module.exports=(app)=>{
    
    app.post("/ecomm/api/v1/products",[authValidaton.jwtVerify,authValidaton.isAdmin,productValidation.validateProductRequest],productController.createProduct);
    
    app.get("/ecomm/api/v1/products",[authValidaton.jwtVerify],productController.findAll);
    
    app.get("/ecomm/api/v1/products/:id",[authValidaton.jwtVerify],productController.findOne);
    
    app.put("/ecomm/api/v1/products/:id",[authValidaton.jwtVerify,authValidaton.isAdmin,productValidation.updateProduct],productController.updateProduct);
    
    app.delete("/ecomm/api/v1/products/:id",[authValidaton.jwtVerify,authValidaton.isAdmin],productController.deleteProduct);
}   