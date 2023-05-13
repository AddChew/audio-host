const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'})

const doc = {
    info: {
        title: 'Audio Host Backend API',
        description: 'API documentation for Audio Host backend'
    },
    host: null,
    schemes: ['http'],
    definitions: {
        Ok: 'string',
        Message: {
            message: 'string'
        },
        BaseUser: {
            id: 'string',
            username: 'string',
            isAdmin: false,
            createdAt: 'string',
            updatedAt: 'string',
        },
        LoggedInUser: {
            id: 'string',
            username: 'string',
            password: 'string',
            isAdmin: false,
            createdAt: 'string',
            updatedAt: 'string',
        },
        RegisterUser: {
            message: 'string',
            user: {
                $ref: '#/definitions/BaseUser'
            }
        },
        LoginUser: {
            message: 'string',
            user: {
                $ref: '#/definitions/LoggedInUser'
            }
        },
        ListUser: {
            count: 10,
            rows: [{
                $ref: '#/definitions/BaseUser'
            }]
        },
        DetailUser: {
            user: {
                $ref: '#/definitions/BaseUser'
            }            
        },
        BaseFile: {
            id: 'string',
            filename: 'string',
            description: 'string',
            category: 'string',
            createdAt: 'string',
            updatedAt: 'string',
            ownerid: 'string'
        }, 
        ListFile: {
            count: 10,
            rows: [{
                $ref: '#/definitions/BaseFile'
            }]
        }      
    }
}

const outputFile = '../swagger-output.json'
const endpointsFile = ['./index.js']

swaggerAutogen(outputFile, endpointsFile, doc).then(
    () => require('./index.js')
)