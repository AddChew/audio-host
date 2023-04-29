const { DataTypes } = require('sequelize')
const db = require('../utils/connection')
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
            unique: {
                arg: true,
                msg: 'This username is already taken'
            },
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