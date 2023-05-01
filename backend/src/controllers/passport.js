const bcrypt = require('bcrypt')
const passport = require('passport')
const User = require('../models/user')
const LocalStrategy = require('passport-local').Strategy

const loginStrategy = async (username, password, done) => {
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

const getUser = async (id) => {
    return await User.findByPk(id, {
        attributes: {
            exclude: ['password']
        }
    })
}

passport.use('login', new LocalStrategy(loginStrategy))
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => done(null, getUser(id)))

module.exports = passport