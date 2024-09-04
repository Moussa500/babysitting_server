const express = require("express");
var route = express.Router();
const EndPoints = require('../constants/endPoints');
const controller = require('../controller/favoriteController');
route.get(EndPoints.Favorite.getUserFavorites,controller.getUserFavorites);
route.put(EndPoints.Favorite.addFavorite,controller.addFavorite);
route.put(EndPoints.Favorite.deleteFavorite,controller.deleteFavorite);
module.exports = route;