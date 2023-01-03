const authValidaton=require("./auth");
const cartValidation=require("./cartReqBodies");
const categoryValidation=require("./categoryReqBodies");
const productValidation=require("./productReqBodies")
const verifySingup=require('./verifySingup')
const authReqValidation=require('./authReqBodies')
module.exports={
    authValidaton,
    verifySingup,
    categoryValidation,
    cartValidation,
    authReqValidation,
    productValidation
}