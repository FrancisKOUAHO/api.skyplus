import mongoose from "mongoose";
const Schema = mongoose.Schema;

const followSchema = new Schema({
    First_name: {
        type: String
    },
    Last_name: {
        type: String
    },
    FullName: {
        type: String
    },
    follow: {
        type: String,
        default: 'OK'
    },

});
const Follows = mongoose.model('Follows', followSchema);
export { Follows }
