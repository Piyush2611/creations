const dotenv = require("dotenv");
dotenv.config();
const Sequelize = require("sequelize");
const { readFileSync } = require('fs');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: true,

    dialectOptions: {
      ssl:
        process.env?.TIDB_ENABLE_SSL === 'true'
          ? {
              minVersion: 'TLSv1.2',
              rejectUnauthorized: true,
              ca: process.env.TIDB_CA_PATH
                ? readFileSync(process.env.TIDB_CA_PATH)
                : undefined,
            }
          : null,
    },
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load Models
db.homepage = require("./model/homepage_model")(sequelize, Sequelize);
db.categories = require("./model/catogories_model")(sequelize, Sequelize);
db.subcategories = require("./model/subCatogory_model")(sequelize, Sequelize);
db.banner = require("../app/model/banner_model")(sequelize,Sequelize);
// db.prod_size = require("../app/model/prod_size_model")(sequelize,Sequelize)  
db.products = require("../app/model/product_model")(sequelize,Sequelize)
module.exports = db;
