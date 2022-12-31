const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./User')(sequelize, Sequelize)
db.Parameter = require('./Parameter')(sequelize, Sequelize)
db.ProductCategory = require('./ProductCategory')(sequelize, Sequelize)
db.VehicleMake = require('./VehicleMake')(sequelize, Sequelize)
db.VehicleModel = require('./VehicleModel')(sequelize, Sequelize)
db.Product = require('./Product')(sequelize, Sequelize)
db.SoldProduct = require('./SoldProduct')(sequelize, Sequelize)
db.Post = require('./Post')(sequelize, Sequelize) 

// Relationships
db.User.hasMany(db.Post, { as: "posts" });
db.Post.belongsTo(db.User, {
  foreignKey: "UserId",
  as: "user",
});

// VehicleMake
db.User.hasMany(db.VehicleMake, { as: "makes" });
db.VehicleMake.belongsTo(db.User, {
  foreignKey: "UserId",
  as: "user",
});


// VehicleModel
db.User.hasMany(db.VehicleModel, { as: "models" });
db.VehicleMake.hasMany(db.VehicleModel, { as: "models" });
db.VehicleModel.belongsTo(db.User, {
  foreignKey: "UserId",
  as: "user",
});
db.VehicleModel.belongsTo(db.VehicleMake, {
  foreignKey: "vehicle_make_id",
  as: "make",
});

module.exports = db;