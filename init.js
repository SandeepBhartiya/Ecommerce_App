const db=require("./models");
const Role=db.role;
const Category=db.category

module.exports=()=>{
    try
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
    }
    catch(err)
    {
        console.log("Error while creating DB:",err.message)
    }   

}

