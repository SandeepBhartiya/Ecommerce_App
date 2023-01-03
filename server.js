const app=require("express")();
const bodyParser=require("body-parser");
const serverConfig=require("./configs/server.configs")
const bcrypt=require('bcryptjs');

app.use(bodyParser.json());

const init=require('./init')
const db=require("./models");
const Category=db.category;
const Product=db.product;


Category.hasMany(Product)
db.sequelize.sync({force:true}).then(()=>{
    console.log("Connected...");
    init();

}).catch(err=>{
    console.log("Error while connecting",err.message)
    err.report
});



require("./routes/auth.routes")(app);
require("./routes/product.routes")(app);
require("./routes/category.route")(app);
require("./routes/cart.route")(app);

app.listen(serverConfig.PORT,()=>{
    console.log("localhost at:",serverConfig.PORT);
})