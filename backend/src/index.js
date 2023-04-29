require("dotenv").config()

const express = require('express')
const bodyparser = require('body-parser')
const session = require('express-session')
const sequelize = require('./utils/connection')
const sessionStore = require('./utils/session')
const { router: authRouter, passport } = require('./routes/auth')

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
app.use(passport.authenticate('session'))

// test route
app.get('/', (req, res, next) => {
    res.send('Ok')
})

// auth routes
app.use('/auth/', authRouter)

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
sessionStore.sync()
sequelize.sync()
         .then(results => {
            console.log('Database connected')
            app.listen(3000)
         })
         .catch(err => console.log(err))