import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import authRoutes from '../routes/auth.routes.js';
import usersRoutes from '../routes/user.routes.js';
import swaggerSpec from '../config/swagger.config.js';

const routerApi = Router();

routerApi.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

routerApi.use('/auth', authRoutes);

routerApi.use('/users', usersRoutes);

export default routerApi;