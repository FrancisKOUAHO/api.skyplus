const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientsSchema = new Schema({
    full_name: String,
    job: String,
    localisations: String,
    company: String,
    image: String,
});

module.exports = mongoose.model("Clients", clientsSchema);


