const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const global_user_inforamtionsSchema = new Schema({
    full_name: String,
    job: String,
    localisations: String,
    company: String,
    image: String,
});

module.exports = mongoose.model("user_informations", global_user_inforamtionsSchema);
