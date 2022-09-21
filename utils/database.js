const Sequelize = require('sequelize');
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } = require('../config/database');

const sequelize = new Sequelize(
    process.env.DB_NAME || DB_NAME,
    process.env.DB_USER || DB_USER,
    process.env.DB_PASSWORD || DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST || DB_HOST,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
        }
    }
);

(async () => {
    await sequelize.sync();
  })();
module.exports=sequelize;