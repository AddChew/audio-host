const swaggerAutogen = require('swagger-autogen')

const doc = {
    info: {
        title: 'Audio Host Backend API',
        description: 'API documentation for Audio Host backend'
    },
    host: 'localhost:3000',
    schemes: ['http'],
}

const outputFile = '../swagger-output.json'
const endpointsFile = ['./index.js']

swaggerAutogen(outputFile, endpointsFile, doc).then(
    () => require('./index.js')
)