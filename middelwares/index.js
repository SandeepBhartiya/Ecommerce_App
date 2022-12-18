const authValidaton=require("./auth");
// const validateRequest=require("./requestValidator")
const categoryValidation=require("./categoryReqBodies");
const productValidation=require("./productReqBodies")
const verifySingup=require('./verifySingup')
module.exports={
    authValidaton,
    verifySingup,
    categoryValidation,
    productValidation
}