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

db.Post = require('./User')(sequelize, Sequelize)
db.Post = require('./Parameter')(sequelize, Sequelize)
db.Post = require('./ProductCategory')(sequelize, Sequelize)
db.Post = require('./VehicleMake')(sequelize, Sequelize)
db.Post = require('./VehicleModel')(sequelize, Sequelize)
db.Post = require('./Product')(sequelize, Sequelize)
db.Post = require('./SoldProduct')(sequelize, Sequelize)
db.Post = require('./Post')(sequelize, Sequelize)

module.exports = db;