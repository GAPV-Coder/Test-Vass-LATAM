import { body, validationResult } from 'express-validator';

const validatedFields = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            message: errors.array(),
        });
    }

    next();
};

const validateRegisterUser = [
    body('fullName')
        .notEmpty()
        .withMessage('name cannot be empty')
        .isLength({ min: 8 })
        .withMessage('name must be at least 8 characters long'),
    body('age')
        .notEmpty()
        .withMessage('age cannot be empty')
        .isLength({ max: 2 })
        .withMessage('You can only enter an age of one or two positive digits'),
    body('email')
        .notEmpty()
        .withMessage('email cannot be empty')
        .isEmail()
        .withMessage('must be a valid email'),
    body('password')
        .notEmpty()
        .withMessage('password cannot be empty')
        .isLength({ min: 8 })
        .withMessage('password must be at least 8 characters long'),
    body('occupation')
        .notEmpty()
        .withMessage('occupation cannot be empty')
        .isLength({ min: 8 })
        .withMessage('occupation must be at least 8 characters long'),
    body('biography')
        .notEmpty()
        .withMessage('biography cannot be empty')
        .isLength({ min: 20 })
        .withMessage('occupation must be at least 20 characters long'),
    body('phone')
        .notEmpty()
        .withMessage('phone cannot be empty')
        .isLength({ min: 10 })
        .withMessage('The phone number must have a maximum of 10 characters'),
    body('birthDay')
        .notEmpty()
        .withMessage('birthDay cannot be empty')
        .isLength({ min: 10 })
        .withMessage('birthDay must be at least 10 characters long'),
        validatedFields,
];

const validateLoginUser = [
    body('email')
        .notEmpty()
        .withMessage('email cannot be empty')
        .isEmail()
        .withMessage('must be a valid email'),
    body('password')
        .notEmpty()
        .withMessage('password cannot be empty')
        .isLength({ min: 8 })
        .withMessage('password must be at least 8 characters long'),
        validatedFields,
];

export { validateRegisterUser, validateLoginUser };