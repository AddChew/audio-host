const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    process.env.PG_DB,
    process.env.PG_USER,
    process.env.PG_PASSWORD,
    {
        host: process.env.PG_HOST,
        dialect: 'postgres',
    }
)

exports.sequelize = sequelize
exports.queryInterface = sequelize.getQueryInterface()