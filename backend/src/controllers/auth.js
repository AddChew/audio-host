const bcrypt = require('bcrypt')
const User = require('../models/user')

exports.registerUser = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await User.create({
            username: username,
            password: bcrypt.hashSync(password, 10),
            isAdmin: false
        })
        req.login(user, (err) => {
            if (err) {
                return next(err)
            }
            return res.status(201).json({
                message: 'Registered successfully!',
                user: user
            }) 
        })
    }
    catch (err) {
        console.log(err)
        return res.status(404).json(err)        
    }
}

exports.loginUser = async (username, password, done) => {
    try {
        const user = await User.findOne({
            where: {
                username: username
            }
        })
        if (!user) {
            return done(null, false, { message: 'Username does not exist'})
        }
        if (bcrypt.compareSync(password, user.password)) {
            return done(null, user)
        }
        return done(null, false, { message: 'Incorrect password'})
    }
    catch (err) {
        console.log(err)
        return done(err)
    } 
}

exports.logoutUser = async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        return res.status(204).json({
            message: 'Logged out successfully!'
        }) 
    })
}

exports.getUser = async (uuid) => {
    return await User.findByPk(uuid, {
        attributes: {
            exclude: ['password']
        }
    })
}