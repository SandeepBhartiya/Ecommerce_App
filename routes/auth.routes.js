const authController=require("../controllers/auth.controllers");
const {verifySingup,authReqValidation}=require('../middelwares')
module.exports=(app)=>{
    app.post("/ecomm/api/v1/singUp",[authReqValidation.singUpValidation,verifySingup.checkDuplicateEmails,verifySingup.checkRolesExisted],authController.singUp);
    app.post("/ecomm/api/v1/singIn",[authReqValidation.singInValidation,verifySingup.isUserExist,verifySingup.isvalidPassword],authController.signIn);
}