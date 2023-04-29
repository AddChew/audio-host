const Sequelize = require('sequelize')
const db = require('../utils/database')

const User = db.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    isAdmin: {
        type: Sequelize.BOOLEAN,
        field: 'is_admin'
    },
    joinedDate: {
        type: Sequelize.DATE,
        field: 'joined_date'
    }
})

module.exports = User