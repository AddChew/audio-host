const { DataTypes } = require('sequelize')
const { sequelize } = require('../utils/connection')

const File = sequelize.define('File', 
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        filename: DataTypes.STRING,
        description: DataTypes.STRING,
        category: DataTypes.STRING,
        content: DataTypes.TEXT
    },
    {
        hooks: {
            afterCreate: (record) => {
                delete record.dataValues.content
            },
            afterUpdate: (record) => {
                delete record.dataValues.content
            }
        }
    }
)

module.exports = File