require("dotenv").config()

const express = require('express')
const bodyparser = require('body-parser')
const sequelize = require('./utils/connection')
const sessionStore = require('./utils/session')

// TODO: see if we need these imports
// const User = require('./models/user')
// const File = require('./models/file')

const app = express()
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    next()
})
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    proxy: true
}))

// test route
app.get('/', (req, res, next) => {
    res.send('Hello World!')
})

// user routes
app.use('/users/', require('./routes/users'))

// file routes
app.use('/files/', require('./routes/files'))

// error handling
app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.statusCode || 500).json({ message: err.message})
})

// sync database
try {
    await sequelize.sync()
    sessionStore.sync()
    console.log('Database connected')
    app.listen(3000)
}
catch (err) {
    console.log(err)
}