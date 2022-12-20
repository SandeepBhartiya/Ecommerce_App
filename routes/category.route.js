const categoryController=require('../controllers/category.controller');
const {authValidaton,categoryValidation}=require('../middelwares')
module.exports=(app)=>{
    app.post("/ecomm/api/v1/category",[authValidaton.jwtVerify,authValidaton.isAdmin,categoryValidation.isvalidcategory],categoryController.createCategory);

    app.get("/ecomm/api/v1/category",[authValidaton.jwtVerify],categoryController.findAll);
    
    app.get("/ecomm/api/v1/category/:id",[authValidaton.jwtVerify],categoryController.findOne);
    
    app.put("/ecomm/api/v1/category/:id",[authValidaton.jwtVerify,authValidaton.isAdmin,categoryValidation.updateCategory],categoryController.updateCategory);
    
    app.delete("/ecomm/api/v1/category/:id",[authValidaton.jwtVerify,authValidaton.isAdmin],categoryController.deleteCategory);
}