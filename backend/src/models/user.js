const { DataTypes } = require('sequelize')
const db = require('../utils/database')

const User = db.define('User', {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
})

module.exports = User