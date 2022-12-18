

const Sequelize=require('sequelize');
const dbConfig=require("../configs/db.configs");


const sequelize=new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host:dbConfig.HOST,
        dialect:dbConfig.dialect,
        pool:{
            max:dbConfig.pool.max,
            min:dbConfig.pool.min,
            acquire:dbConfig.pool.acquire,
            idle:dbConfig.pool.idle
        }
    }
);

var db={};

db.Sequelize=Sequelize;
db.sequelize=sequelize;

db.user=require('./user.model')(sequelize,Sequelize);
db.role=require('./role.model')(sequelize,Sequelize);
db.product=require('./product.model')(sequelize,Sequelize);
db.category=require('./category.model')(sequelize,Sequelize);
db.cart=require('./cart.model')(sequelize,Sequelize);

db.role.belongsToMany(db.user,{
    through:"user_roles",
    foreignKey:"role_id",
    otherKey:"user_id"
});
db.user.belongsToMany(db.role,{
    through:"user_roles",
    foreignKey:"user_id",
    otherKey:"role_id"
});

db.user.hasMany(db.cart);

db.product.belongsToMany(db.cart,{
    through:"cart_products",
    foreignKey:"productId",
    otherKey:"cartId"
});

db.cart.belongsToMany(db.product,{
    through:"cart_products",
    foreignKey:"cartId",
    otherKey:"productId"
});


db.ROLES=["customer","admin"]


module.exports=db;