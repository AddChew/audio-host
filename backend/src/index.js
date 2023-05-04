const bcrypt = require('bcrypt')
const express = require('express')
const User = require('./models/user')
const bodyparser = require('body-parser')
const multer = require('multer')
const session = require('express-session')
const sequelize = require('./utils/connection')
const sessionStore = require('./utils/session')
const passport = require('./controllers/passport')
const swaggerUI = require('swagger-ui-express')
const swaggerFile = require('../swagger-output.json')

const app = express()
const upload = multer({
    limits: { fieldSize: 25 * 1024 * 1024 }
})
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(upload.array())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
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
app.use('/auth/', require('./routes/auth'))

// user routes
app.use('/users/', require('./routes/users'))

// file routes
app.use('/files/', require('./routes/files'))

// api documentation route
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerFile))

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
            return User.findOne({
                where: {
                    username: process.env.ADMIN_USER
                }
            }).then(user => user)
         })
         .then(user => {
            if (user) {
                console.log(`Found admin user ${user.username}`)
                return
            }
            return User.create({
                username: process.env.ADMIN_USER,
                password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
                isAdmin: true
            }).then(user => console.log(`Created admin user ${user.username}`))
         })
         .then(app.listen(3000))
         .catch(err => console.log(err))