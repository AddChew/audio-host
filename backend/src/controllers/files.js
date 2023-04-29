const File = require('../models/file')

// get all files owned by current user
exports.getFiles = (req, res, next) => {
    File.findAll({
        attributes: {
            exclude: ['content']
        }, 
        where: {
            ownerUuid: req.user.uuid
        }})
        .then(files => {
            res.status(200).json({ files: files })
        })
        .catch(err => console.log(err))
}

// get file by uuid, owned by current user
exports.getFile = (req, res, next) => {
    File.findOne({
        where: {
            uuid: req.params.fileUuid,
            ownerUuid: req.user.uuid
        }
    })
    .then(file => {
        if (file) {
            return res.status(200).json({ file: file })
        }
        res.status(404).json({ message: 'File not found!' })
    })
    .catch(err => console.log(err))
}

// create file
exports.createFile = (req, res, next) => {
    File.create({ // TODO: const { filename, description , ... } = req.body
        filename: req.body.filename,
        description: req.body.description,
        category: req.body.category,
        content: req.body.content,
        ownerUuid: req.user.userUuid
    })
    .then(file => {
        console.log(`Created file ${file.filename}`)
        res.status(201).json({
            message: `File ${file.filename} created successfully!`,
            file: file
        })
    })
    .catch(err => console.log(err))
}