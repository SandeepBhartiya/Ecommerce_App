const app=require("express")();
const bodyParser=require("body-parser");
const serverConfig=require("./configs/server.configs")
const bcrypt=require('bcryptjs');

app.use(bodyParser.json());


const db=require("./models");
const Role=db.role;
const Category=db.category;
const Product=db.product;
const User=db.user;
Category.hasMany(Product)
db.sequelize.sync({force:true}).then(()=>{
    console.log("Connected...");
    init();

}).catch(err=>{
    console.log("Error while connecting",err.message)
    err.report
});


function init()
{
    var categories=[
        {
            name:"Electronic",
            description:"this category contain all electronic appliances"
        },
        {
            name:"Home Appliance",
            description:"this category contain all home appliances"
        },
    ];
    console.log("sampleTXT\n\n")
    Category.bulkCreate(categories).then(()=>{
        console.log("Category is added")
    }).catch(err=>{
        console.log("Error while initializing the category",err.message)
    });

    Role.create({
        id:1,
        name:"customer"
    });

    Role.create({
        id:2,
        name:"admin"
    });

    User.create({
        username:"sandeep",
        email:"sandeepbhartiya9087@gmail.com",
        password:bcrypt.hashSync("Welcome")    
    });
}

require("./routes/auth.routes")(app);
require("./routes/product.routes")(app);
require("./routes/category.route")(app);
require("./routes/cart.route")(app);

app.listen(serverConfig.PORT,()=>{
    console.log("localhost at:",serverConfig.PORT);
})