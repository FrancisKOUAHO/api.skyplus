import mongoose from "mongoose";
const Schema = mongoose.Schema;

const clientsSchema = new Schema({
    First_name: {
        type: String
    },
    Last_name: {
        type: String
    },
    FullName: {
        type: String
    },
    Job: {
        type: String
    },
    Localisations: {
        type: String
    },
    Company: {
        type: String
    },
    Image: {
        type: String
    },
});
const Client = mongoose.model('Clients', clientsSchema);
export { Client }




