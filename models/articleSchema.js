mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        article: { type: String, required: true },
        image: { type: String }
    }
);
const article = mongoose.model("article", articleSchema);
module.exports = article;