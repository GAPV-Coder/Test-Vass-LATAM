import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connection.setMaxListeners(0);

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Successful database connection');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};