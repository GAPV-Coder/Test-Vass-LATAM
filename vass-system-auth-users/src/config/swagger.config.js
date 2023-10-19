import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'RESTfull API user management',
            version: '1.0.0',
            description: 'RESTfull API for user management and CRUD operations',
        },
    },
    apis: [
        './src/routes/auth.routes.js',
        './src/routes/user.routes.js',
        './src/controllers/auth.controller.js',
        './src/controllers/user.controller.js',
    ],
    components: {
        schemas: {
            User: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'string',
                        description: 'User ID',
                        example: '5fbd9d4f5d3b6d2e9c6f7bcb',
                    },
                    fullName: {
                        type: 'string',
                        description: 'User full name',
                        example: 'John Doe',
                    },
                    age: {
                        type: 'number',
                        description: 'User age',
                        example: 30,
                    },
                    email: {
                        type: 'string',
                        description: 'User email',
                        example: '',
                    },
                    password: {
                        type: 'string',
                        description: 'User password',
                        example: '',
                    },
                    occupation: {
                        type: 'string',
                        description: 'User occupation',
                        example: 'Developer',
                    },
                    biography: {
                        type: 'string',
                        description: 'User biography',
                        example: 'I am a developer',
                    },
                    phone: {
                        type: 'string',
                        description: 'User phone',
                        example: '1234567890',
                    },
                    birthDay: {
                        type: 'string',
                        description: 'User birthday',
                        example: '1990-01-01',
                    },
                    isActive: {
                        type: 'boolean',
                        description: 'User status',
                        example: true,
                    },
                    role: {
                        type: 'string',
                        description: 'User role',
                        example: 'user',
                    },
                },
            },
        },
    },
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
