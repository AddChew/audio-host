const File = require('../models/file')

// get all files owned by current user
exports.getFiles = async (req, res, next) => {
    // #swagger.tags = ['Files']
    // #swagger.summary = 'Retrieve list of files uploaded by current user'
    // #swagger.description = 'Route to retrieve list of files uploaded by current user.'
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
        description: 'Retrieved list of files uploaded by current user successfully.',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/definitions/ListFile"
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
        const user = await req.user
        const results = await File.findAndCountAll({
            attributes: {
                exclude: ['content']
            },
            where: {
                ownerid: user.id
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

// get file by id, owned by current user
exports.getFile = async (req, res, next) => {
    // #swagger.tags = ['Files']
    try {
        const user = await req.user
        const file = await File.findOne({
            where: {
                id: req.params.fileid,
                ownerid: user.id
            }
        })
        if (file) {
            return res.status(200).json({ file: file })
        }
        return res.status(404).json({ message: 'File not found' })
    }
    catch (err) {
        console.log(err)
        return es.status(404).json(err)
    }
}

// create file
exports.createFile = async (req, res, next) => {
    // #swagger.tags = ['Files']
    try {
        const user = await req.user
        const { filename, description, category, content } = req.body
        const file = await File.create({
            filename: filename,
            description: description,
            category: category,
            content: content,
            ownerid: user.id
        })
        console.log(`Created file ${file.filename}`)
        return res.status(201).json({
            message: `File ${file.filename} created successfully`,
            file: file
        })       
    }
    catch (err) {
        console.log(err)
        return res.status(404).json(err)
    }
}