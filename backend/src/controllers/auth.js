const bcrypt = require('bcrypt')
const User = require('../models/user')
const passport = require('./passport')

exports.registerUser = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await User.create({
            username: username,
            password: bcrypt.hashSync(password, 10),
            isAdmin: false
        })
        req.login(user, err => {
            if (err) {
                return next(err)
            }
            return res.status(201).json({
                message: 'Registered successfully',
                user: user
            }) 
        })
    }
    catch (err) {
        console.log(err)
        return res.status(404).json(err)        
    }
}

exports.loginUser = async (req, res, next) => {
    console.log("logging in")
    passport.authenticate('login', (err, user, info, status) => {
        if (err) {
            console.log("err")
            return next(err)
        }
        if (!user) {
            console.log("no user")
            console.log(info)
            return {
                message: info
            }
        }
        console.log("try to loging")
        req.login(user, err => {
            if (err) {
                console.log(err)
                console.log('login err')
                return next(err)
            }
            console.log('login liao')
            return res.status(200).json({
                message: 'Logged in successfully',
                user: user
            })
        })
    })(req, res, next)
}

exports.logoutUser = async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        return res.status(204).json({
            message: 'Logged out successfully'
        }) 
    })
}

exports.checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    return res.status(401).json({
        message: 'Authorization required'
    })
}

exports.checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.status(403).json({
            message: 'You are already logged in'
        })
    }
    return next()
}