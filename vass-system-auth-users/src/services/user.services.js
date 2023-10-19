import User from '../models/user.model.js';
import AppError from '../helpers/appError.js';

class UserService {
    async getUsers() {
        return User.find({ isActive: true });
    }

    async getUserById(userId) {
        const user = await User.findById(userId);
        if (!user || !user.isActive) {
            throw new AppError('User not found', 404);
        }
        return user;
    }

    async updateUser(userId, updatedData) {
        const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
        if (!user || !user.isActive) {
            throw new AppError('User not found', 404)
        }
        return user;
    }

    async deleteUser(adminId, userId) {
        const admin = await User.findById(adminId);
        if (!admin || admin.role !== 'admin') {
            throw new AppError('Only admin can delete user', 403);
        }

        const user = await User.findByIdAndUpdate(userId, { isActive: false }, { new: true });
        if (!user || !user.isActive) return user;
    }
};

export default new UserService();