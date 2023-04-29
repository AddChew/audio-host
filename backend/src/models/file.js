const { DataTypes } = require('sequelize')
const db = require('../utils/database')

const File = db.define('File', {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    filename: DataTypes.STRING,
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    content: DataTypes.BLOB
})

module.exports = File