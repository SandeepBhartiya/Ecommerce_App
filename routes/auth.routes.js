const authController=require("../controllers/auth.controllers");
const {verifySingup}=require('../middelwares')
module.exports=(app)=>{
    app.post("/ecom/api/v1/singUp",[verifySingup.checkDuplicateEmails,verifySingup.checkRolesExisted],authController.singUp);
    app.post("/ecom/api/v1/singIn",[verifySingup.isUserExist,verifySingup.isvalidPassword],authController.signIn);
}