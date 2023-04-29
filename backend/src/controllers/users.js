const bcrypt = require('bcrypt')
const User = require('../models/user') // TODO: async, await everything instead of then catch

// get all users
exports.getUsers = (req, res, next) => {
    User.findAll({
        attributes: {
            exclude: ['password']
        }})
        .then(users => {
            res.status(200).json({ users: users })
        })
        .catch(err => console.log(err))
}

// get user by uuid
exports.getUser = (req, res, next) => {
    User.findByPk(req.params.userUuid, {
        attributes: {
            exclude: ['password']
        }})
        .then(user => {
            if (user) {
                return res.status(200).json({ user: user })
            }
            res.status(404).json({ message: 'User not found!'})
        })
        .catch(err => console.log(err))
}

// create user
exports.createUser = (req, res, next) => {
    User.create({
        username: req.body.username,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    })
    .then(user => {
        console.log(`Created user ${user.username}`)
        res.status(201).json({
            message: `User ${user.username} created successfully!`,
            user: user
        })
    })
    .catch(err => console.log(err))
}

// update user
exports.updateUser = (req, res, next) => {
    User.findByPk(req.params.userUuid)
        .then(user => {
            if (user) { // TODO: allow users to just specify the fields they want to change and leave the remaining fields empty
                user.username = req.body.username
                user.password = bcrypt.hash(req.body.password, 10)
                user.isAdmin = req.body.isAdmin  // TODO: const { username, password, ... } = req.body
                return user.save()
            }
            res.status(404).json({ message: 'User not found!'})
        })
        .then(result => {
            res.status(204).json({ message: 'User updated!', user: result })
        })
        .catch(err => console.log(err))   
}

// delete user
exports.deleteUser = (req, res, next) => {
    User.findByPk(req.params.userUuid)
        .then(user => {
            if (user) {
                return user.destroy()
            }
            res.status(404).json({ message: 'User not found!'})
        })
        .then(result => {
            res.status(204).json({ message: 'User deleted!' })
        })
        .catch(err => console.log(err))   
}