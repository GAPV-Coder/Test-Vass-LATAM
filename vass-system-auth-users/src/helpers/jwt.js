import jwt from 'jsonwebtoken';

const generateToken = (id, email, role) => {
    const payload = { id, email, role };
    const secretKey = process.env.JWT_SECRET;
    const options = { expiresIn: process.env.JWT_EXPIRES_IN };
    
    try {
        const token = jwt.sign(payload, secretKey, options);
        return token;
    } catch (error) {
        throw new Error('Error generating token')
    }
}

const validateToken = (token) => {
    const secretKey = process.env.JWT_SECRET;
    // const token = req.header('Authorization')

    if (!token) {
        throw new Error('Token not provided in Authorization header')
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        if (decoded.id && decoded.email && decoded.role) {
            return true;
        } else {
            throw new Error('Invalid token: missing required information')
        }
    } catch (error) {
        throw new Error('Invalid token')
    }
}
export default { generateToken, validateToken };
