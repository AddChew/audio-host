const bcrypt = require('bcrypt')
const User = require('../models/user')
const passport = require('./passport')


exports.registerUser = async (req, res, next) => {
    // #swagger.tags = ['Authentication']
    // #swagger.summary = 'Register new user'
    // #swagger.description = 'Route to register new user. Logs in new user and returns session cookie upon successful registration.'
    /* #swagger.requestBody = {
            required: true,
            "@content": {
                "multipart/form-data": {
                    schema: {
                        type: "object",
                        properties: {
                            username: {
                                type: "string"
                            },
                            password: {
                                type: "string",
                                format: "password"
                            }
                        },
                        required: ["username", "password"]
                    }
                }
            }
    } 
    */
    /* #swagger.responses[201] = {
        description: 'Registered new user successfully.',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/definitions/RegisterUser"
                }
            }
        }
    }
    */
    /* #swagger.responses[403] = {
        description: 'You are already logged in.',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/definitions/UnauthorizedMessage"
                }
            }
        }
    }
    */
    /* #swagger.responses[404] = {
        description: 'Username is already taken.'
    }
    */
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
    // #swagger.tags = ['Authentication']
    // #swagger.summary = 'Login existing user'
    // #swagger.description = 'Route to login existing user and return session cookie.'
    /* #swagger.requestBody = {
            required: true,
            "@content": {
                "multipart/form-data": {
                    schema: {
                        type: "object",
                        properties: {
                            username: {
                                type: "string"
                            },
                            password: {
                                type: "string",
                                format: "password"
                            }
                        },
                        required: ["username", "password"]
                    }
                }
            }
    } 
    */
    /* #swagger.responses[200] = {
        description: 'Logged in successfully.',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/definitions/LoginUser"
                }
            }
        }
    }
    */
    /* #swagger.responses[403] = {
        description: 'You are already logged in.',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/definitions/UnauthorizedMessage"
                }
            }
        }
    }
    */
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
    // #swagger.tags = ['Authentication']
    // #swagger.summary = 'Log out user'
    // #swagger.description = 'Route to logout logged in user and invalidate session cookie.'
    /* #swagger.responses[204] = {
        description: 'Logged out successfully.'
    }
    */
    /* #swagger.responses[401] = {
        description: 'You are not logged in.',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/definitions/UnauthorizedMessage"
                }
            }
        }
    }
    */
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

exports.checkIsAdmin = async (req, res, next) => {
    const user = await req.user
    if (user.isAdmin) return next()
    return res.status(403).json({
        message: 'Insufficient permissions'
    })
}