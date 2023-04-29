const bcrypt = require('bcrypt')
const User = require('../models/user')

// get all users
exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ['password']
            }
        })
        res.status(200).json({ users: users })
    } 
    catch (err) {
        console.log(err)
    }
}

// get user by uuid
exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.userUuid, {
            attributes: {
                exclude: ['password']
            }
        })
        if (user) {
            return res.status(200).json({ user: user })
        }
        res.status(404).json({ message: 'User not found!'})
    }
    catch (err) {
        console.log(err)
    }
}

// create user
exports.createUser = async (req, res, next) => {
    try {
        const { username, password, isAdmin } = req.body
        const user = await User.create({
            username: username,
            password: password,
            isAdmin: isAdmin            
        })
        console.log(`Created user ${user.username}`)
        res.status(201).json({
            message: `User ${user.username} created successfully!`,
            user: user
        })        
    }
    catch (err) {
        console.log(err)
    }
}

// update user
exports.updateUser = async (req, res, next) => {
    try {
        let user = await User.findByPk(req.params.userUuid)
        const { username, password, isAdmin } = req.body
        if (user) {
            user.username = username ? username : user.username
            user.password = password ? bcrypt.hashSync(password, 10) : user.password
            user.isAdmin = isAdmin ? isAdmin : user.isAdmin
            user = await user.save()
            return res.status(204).json({ message: 'User updated!', user: user })
        }
        res.status(404).json({ message: 'User not found!'})
    }
    catch (err) {
        console.log(err)
    }
}

// delete user
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.userUuid)
        if (user) {
            await user.destroy()
            return res.status(204).json({ message: 'User deleted!' })
        }
        res.status(404).json({ message: 'User not found!'})
    }
    catch (err) {
        console.log(err)
    }
}