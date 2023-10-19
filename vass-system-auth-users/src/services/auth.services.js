import User from '../models/user.model.js';
import jwtHelper from '../helpers/jwt.js';
import encryptPasswordHelper from '../helpers/encryptPassword.js';
import AppError from '../helpers/appError.js';

class AuthService {
    async registerUser(
        fullName,
        age,
        email,
        password,
        occupation,
        biography,
        phone,
        birthDay,
        isActive,
        role,
    ) {
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new AppError('Email already exist', 401);
            }

            const hashedPassword =
                await encryptPasswordHelper.encryptPassword(password);

            const newUser = new User({
                fullName,
                age,
                email,
                password: hashedPassword,
                occupation,
                biography,
                phone,
                birthDay,
                isActive,
                role,
            });

            await newUser.save();

            const token = jwtHelper.generateToken(
                newUser.id,
                newUser.email,
                newUser.role,
            );

            const userWithoutPassword = { ...newUser._doc, password: undefined };

            return { user: userWithoutPassword, token };

        } catch (error) {
            throw new AppError('Register failed', 403);
        }
    }

    async loginUser(email, password) {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AppError('User not found', 404);
            }

            const isPasswordValid = await encryptPasswordHelper.comparePassword(
                password,
                user.password,
            );

            if (!isPasswordValid) {
                throw new AppError('Invalid password', 401);
            };

            const token = jwtHelper.generateToken(user.id, user.email, user.role);

            return { user, token };
        } catch (error) {
            throw new AppError('Login failed', 404);
        }
    }
};

export default new AuthService();