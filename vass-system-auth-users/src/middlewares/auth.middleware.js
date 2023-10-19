import jwt from 'jsonwebtoken';
import responses from '../helpers/responses.js';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return responses.error({
            res,
            message: 'You are not authenticated',
            status: 401,
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return responses.error({
            res,
            message: 'Invalid token',
            status: 401,
        });
    }
};

export default authMiddleware;
