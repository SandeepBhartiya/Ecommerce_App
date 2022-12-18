const productController=require("../controllers/product.controller");
const {authValidaton,productValidation}=require("../middelwares")

module.exports=(app)=>{
    
    app.post("/ecom/api/v1/products",[authValidaton.jwtVerify,authValidaton.isAdmin,productValidation.validateProductRequest],productController.createProduct);
    
    app.get("/ecom/api/v1/products",[authValidaton.jwtVerify],productController.findAll);
    
    app.get("/ecom/api/v1/products/:id",[authValidaton.jwtVerify],productController.findOne);
    
    app.put("/ecom/api/v1/products/:id",[authValidaton.jwtVerify,authValidaton.isAdmin,productValidation.updateProduct],productController.updateProduct);
    
    app.delete("/ecom/api/v1/products/:id",[authValidaton.jwtVerify,authValidaton.isAdmin],productController.deleteProduct);
}   