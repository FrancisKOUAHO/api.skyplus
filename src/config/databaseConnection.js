import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const {MONGO_URL} = process.env;

const connectToDatabase = async () => {
    const options = {useNewUrlParser: true, useFindAndModify: true, useCreateIndex: true, useUnifiedTopology: true};

    await mongoose.connect(MONGO_URL, options).then(() => {
        console.log('Mongodb is Connect')

    }).catch((e) => {
        console.log(`${e} mongodb is not Connect`)
    })
};

export {connectToDatabase};
