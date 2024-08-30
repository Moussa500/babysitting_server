const express = require("express");
const route = express.Router();
const endPoints = require("../constants/endPoints");
const upload = require('../middlewares/uploadFile');
const articleController = require('../controller/articleController');
route.post(endPoints.Article.postArticle, upload.single("image"), articleController.postArticle);
route.put(endPoints.Article.updateArticle,articleController.updateArticle);
route.get(endPoints.Article.getArticles,upload.single("image"),articleController.getAllArticles);
module.exports = route;