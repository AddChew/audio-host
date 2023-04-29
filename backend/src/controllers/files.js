const File = require('../models/file')

// get all files owned by current user
exports.getFiles = async (req, res, next) => {
    try {
        const files = await File.findAll({
            attributes: {
                exclude: ['content']
            },
            where: {
                ownerUuid: req.user.uuid
            },
            order: [
                ['createdAt', 'DESC']
            ]
        })
        return res.status(200).json({ files: files })
    }
    catch (err) {
        console.log(err)
        return res.status(404).json(err)
    }
}

// get file by uuid, owned by current user
exports.getFile = async (req, res, next) => {
    try {
        const file = await File.findOne({
            where: {
                uuid: req.params.fileUuid,
                ownerUuid: req.user.uuid
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
    try {
        const { filename, description, category, content } = req.body
        const file = await File.create({
            filename: filename,
            description: description,
            category: category,
            content: content,
            ownerUuid: req.user.uuid
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