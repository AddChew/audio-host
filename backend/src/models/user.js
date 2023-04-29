const { DataTypes } = require('sequelize')
const db = require('../utils/database')
const File = require('../models/file')

const User = db.define('User', 
    {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: DataTypes.STRING,
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    }, 
    {
        hooks: {
            afterCreate: (record) => {
                delete record.dataValues.password
            },
            afterUpdate: (record) => {
                delete record.dataValues.password
            }
        }
    }
)

User.hasMany(File, {
    foreignKey: 'ownerUuid'
})
File.belongsTo(User)

module.exports = User