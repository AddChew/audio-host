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
    passport.authenticate('login', (err, user, info, status) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            return next(info)
        }
        req.login(user, err => {
            if (err) {
                return next(err)
            }
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

exports.checkIsAdmin = (req, res, next) => {
    if (req.user.isAdmin) return next() // TODO: potential bug
    return res.status(403).json({
        message: 'Insufficient permissions'
    })
}