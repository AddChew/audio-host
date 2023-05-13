const { sequelize } = require('./connection')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const sessionStore = new SequelizeStore({
    db: sequelize
})

module.exports = sessionStore