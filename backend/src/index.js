const express = require('express')
const bodyparser = require('body-parser')
const sequelize = require('./utils/database')
const User = require('./models/user')
const File = require('./models/file')

const app = express()
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    next()
})

// test route
app.get('/', (req, res, next) => {
    res.send('Hello World!')
})

// user routes
app.use('/users/', require('./routes/users'))

// error handling
app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.statusCode || 500).json({ message: err.message})
})

// sync database
sequelize.sync()
         .then(results => {
            console.log('Database connected')
            app.listen(3000)
         })
         .catch(err => console.log(err))