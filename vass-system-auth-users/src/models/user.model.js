import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema ({
    fullName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    biography: String,
    phone: String,
    birthDay: Date,
    isActive: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
});

const User = model('User', userSchema);

export default User;