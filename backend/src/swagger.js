const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'})

const doc = {
    info: {
        title: 'Audio Host Backend API',
        description: 'API documentation for Audio Host backend'
    },
    host: null,
    schemes: ['http'],
    definitions: {
        Ok: 'Ok',
        UnauthorizedMessage: {
            message: 'Error message.'
        },
        BaseUser: {
            id: 'uuid',
            username: 'yourusername',
            isAdmin: false,
            createdAt: '1900-01-01T00:00:00.00Z',
            updatedAt: '1900-01-01T00:00:00.00Z',
        },
        LoggedInUser: {
            id: 'uuid',
            username: 'yourusername',
            password: 'yourhashedpassword',
            isAdmin: false,
            createdAt: '1900-01-01T00:00:00.00Z',
            updatedAt: '1900-01-01T00:00:00.00Z',
        },
        RegisterUser: {
            message: 'Success message',
            user: {
                $ref: '#/definitions/BaseUser'
            }
        },
        LoginUser: {
            message: 'Success message',
            user: {
                $ref: '#/definitions/LoggedInUser'
            }
        },
        ListUser: {
            count: 10,
            rows: [{
                $ref: '#/definitions/BaseUser'
            }]
        }
    }
}

const outputFile = '../swagger-output.json'
const endpointsFile = ['./index.js']

swaggerAutogen(outputFile, endpointsFile, doc).then(
    () => require('./index.js')
)