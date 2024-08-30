articleModel = require("../models/articleSchema");
module.exports.postArticle = async (req, res) => {
    try {
        const { article, title } = req.body;
        const image = req.file ? req.file.path : null;
        const newArticle = new articleModel({
            article, title, image
        });
        const articleAdded = await newArticle.save();
        res.status(201).json({ articleAdded });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports.getAllArticles = async (req, res) => {
    try {
        let ArticleList = [];
        ArticleList = await articleModel.find();
        res.status(201).json({ ArticleList });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports.updateArticle = async (req, res) => {
    try {
        const { articleID,article,title } = req.body;
        updatedArticle = await articleModel.findByIdAndUpdate(articleID,{
            title,article,image
        });
        res.status(201).json({message:"Article updated successfully"});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}