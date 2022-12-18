const categoryController=require('../controllers/category.controller');
const {authValidaton,categoryValidation}=require('../middelwares')
module.exports=(app)=>{
    app.post("/category/api/v1/createCategory",[authValidaton.jwtVerify,authValidaton.isAdmin,categoryValidation.isvalidcategory],categoryController.createCategory);

    app.get("/category/api/v1/createCategory",[authValidaton.jwtVerify],categoryController.findAll);
    
    app.get("/category/api/v1/createCategory/:id",[authValidaton.jwtVerify],categoryController.findOne);
    
    app.put("/category/api/v1/createCategory/:id",[authValidaton.jwtVerify,authValidaton.isAdmin,categoryValidation.updateCategory],categoryController.updateCategory);
    
    app.delete("/category/api/v1/createCategory/:id",[authValidaton.jwtVerify,authValidaton.isAdmin],categoryController.deleteCategory);
}