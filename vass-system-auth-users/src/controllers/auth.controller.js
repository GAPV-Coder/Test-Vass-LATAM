import AuthService from '../services/auth.services.js';
import catchAsync from '../helpers/catchAsync.js';
import responses from '../helpers/responses.js';

export const registerUser = catchAsync(async (req, res) => {
    const {
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
    } = req.body;

    const { user, token } = await AuthService.registerUser(
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
    );

    responses.success({
        res,
        message: 'User registered successfully',
        data: { user, token },
    });
});

export const loginUser = catchAsync(async (req, res) => {
    const { email, password } = req.body;

    const { user, token } = await AuthService.loginUser(email, password);

    responses.success({
        res,
        message: 'User logged in successfully',
        data: { user, token },
    });
});