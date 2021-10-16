import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const URI = process.env.MONGODB_URL;

const connectToDatabase = async () => {
    const options = { useNewUrlParser: true, useUnifiedTopology: true,};
    try {
        await mongoose.connect(URI, options);
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

export {connectToDatabase};
