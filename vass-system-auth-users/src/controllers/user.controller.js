import userService from "../services/user.services.js";
import catchAsync from "../helpers/catchAsync.js";
import responses from "../helpers/responses.js";


export const getUsers = catchAsync(async (req, res) => {
    const users = await userService.getUsers();
    responses.success({
        res,
        message: 'Users retrieved successfully',
        data: users
    });
});

export const getUserById = catchAsync(async (req, res) => {
    const userId = req.params.id;
    const updatedData = req.body;
    const user = await userService.updateUser(userId, updatedData);
    responses.success({
        res,
        message: 'User updated successfully',
        data: user
    });
});

export const updateUser = catchAsync(async (req, res) => {
    const userId = req.params.id;
    const updatedData = req.body;
    const user = await userService.updateUser(userId, updatedData);
    responses.success({
        res,
        message: 'User updated successfully',
        data: user
    });
});

export const deleteUser = catchAsync(async (req, res) => {
    const adminId = req.user.id;
    const userId = req.params.id;
    try {
        const user = await userService.deleteUser(adminId, userId);
        responses.success({
        res,
        message: 'User deleted successfully',
        status: 200
    });
    } catch (error) {
        responses.error({
        res,
        message: 'User not found',
        status: 404
    });
    }
});