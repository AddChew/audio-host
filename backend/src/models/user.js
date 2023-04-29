const { DataTypes } = require('sequelize')
const db = require('../utils/database')
const File = require('../models/file')

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

User.hasMany(File, {
    foreignKey: 'ownerUuid'
})
File.belongsTo(User)

module.exports = User