const bcrypt = require('bcrypt')
const User = require('../models/user')

// get all users
exports.getUsers = async (req, res, next) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Retrieve list of users'
    // #swagger.description = 'Route to retrieve list of users.'
    /* #swagger.parameters['limit'] = {
        in: 'query',
        description: 'Max number of records returned per page',
        schema: "10"
    }
    */
    /* #swagger.parameters['offset'] = {
        in: 'query',
        description: 'Number of records to skip',
        schema: "0"
    }
    */
    /* #swagger.responses[200] = {
        description: 'Retrieved list of users successfully.',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/definitions/ListUser"
                }
            }
        }
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
    /* #swagger.responses[403] = {
        description: 'You are not authorized to perform this operation.',
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
        description: 'Resource not found.',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/definitions/UnauthorizedMessage"
                }
            }
        }
    }
    */
    try {
        const results = await User.findAndCountAll({
            attributes: {
                exclude: ['password']
            },
            order: [
                JSON.parse(req.query.sort)
            ],
            limit: req.query.limit,
            offset: req.query.offset
        })
        return res.status(200).json(results)
    } 
    catch (err) {
        console.log(err)
        return res.status(404).json(err)
    }
}

// get user by id
exports.getUser = async (req, res, next) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Retrieve user details based on userid'
    // #swagger.description = 'Route to retrieve user details based on userid.'
    /* #swagger.parameters['userid'] = {
        in: 'path',
        description: 'Unique identifier of user'
    }
    */
    /* #swagger.responses[200] = {
        description: 'Retrieved user details successfully.',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/definitions/DetailUser"
                }
            }
        }
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
    /* #swagger.responses[403] = {
        description: 'You are not authorized to perform this operation.',
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
        description: 'User not found.'
    }
    */
    try {
        const user = await User.findByPk(req.params.userid, {
            attributes: {
                exclude: ['password']
            }
        })
        if (user) {
            return res.status(200).json({ user: user })
        }
        return res.status(404).json({ message: 'User not found'})
    }
    catch (err) {
        console.log(err)
        return res.status(404).json(err)
    }
}

// create user
exports.createUser = async (req, res, next) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Create new user'
    // #swagger.description = 'Route to create new user.'
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
                            },
                            isAdmin: {
                                type: "boolean"
                            }
                        },
                        required: ["username", "password", "isAdmin"]
                    }
                }
            }
    } 
    */
    /* #swagger.responses[201] = {
        description: 'Created new user successfully.',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/definitions/RegisterUser"
                }
            }
        }
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
    /* #swagger.responses[403] = {
        description: 'You are not authorized to perform this operation.',
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
        const { username, password, isAdmin } = req.body
        const user = await User.create({
            username: username,
            password: bcrypt.hashSync(password, 10),
            isAdmin: isAdmin ? isAdmin : false           
        })
        console.log(`Created user ${user.username}`)
        return res.status(201).json({
            message: `User ${user.username} created successfully`,
            user: user
        })        
    }
    catch (err) {
        console.log(err)
        return res.status(404).json(err)
    }
}

// update user
exports.updateUser = async (req, res, next) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Update user details'
    // #swagger.description = 'Route to update user details.'
    /* #swagger.parameters['userid'] = {
        in: 'path',
        description: 'Unique identifier of user'
    }
    */
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
                            },
                            isAdmin: {
                                type: "boolean"
                            }
                        }
                    }
                }
            }
    } 
    */
    /* #swagger.responses[200] = {
        description: 'Updated user details successfully.',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/definitions/RegisterUser"
                }
            }
        }
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
    /* #swagger.responses[403] = {
        description: 'You are not authorized to perform this operation.',
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
        description: 'User not found.'
    }
    */
    try {
        let user = await User.findByPk(req.params.userid)
        const { username, password, isAdmin } = req.body
        if (user) {
            user.username = username ? username : user.username
            user.password = password ? bcrypt.hashSync(password, 10) : user.password
            if ((isAdmin === false) || (isAdmin)) {
                user.isAdmin = isAdmin
            }
            user = await user.save()
            return res.status(200).json({ message: 'User updated', user: user })
        }
        return res.status(404).json({ message: 'User not found'})
    }
    catch (err) {
        console.log(err)
        return res.status(404).json(err)
    }
}

// delete user
exports.deleteUser = async (req, res, next) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Delete user'
    // #swagger.description = 'Route to delete existing user.'
    /* #swagger.parameters['userid'] = {
        in: 'path',
        description: 'Unique identifier of user'
    }
    */
    /* #swagger.responses[200] = {
        description: 'Deleted user successfully.',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/definitions/RegisterUser"
                }
            }
        }
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
    /* #swagger.responses[403] = {
        description: 'You are not authorized to perform this operation.',
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
        description: 'User not found.'
    }
    */
    try {
        const user = await User.findByPk(req.params.userid, {
            attributes: {
                exclude: ['password']
            }
        })
        if (user) {
            await user.destroy()
            return res.status(200).json({ message: 'User deleted', user: user })
        }
        return res.status(404).json({ message: 'User not found'})
    }
    catch (err) {
        console.log(err)
        return res.status(404).json(err)
    }
}