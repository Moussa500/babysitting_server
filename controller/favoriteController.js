const userModel = require('../models/userSchema');
module.exports.getUserFavorites = async (req, res) => {
    try {
        const { id } = req.params;
        const userFavorites = await userModel.findById(id, 'favorites');
        if (!userFavorites) {
            res.status(404).json('Not found');
        }
        res.status(200).json({ favorites: userFavorites.favorites });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}
module.exports.addFavorite = async (req, res) => {
    try {
        const { favoriteId, id } = req.body;
        const favoriteAdded = await userModel.findByIdAndUpdate(id, {
            $addToSet: {
                favorites: favoriteId,
            }
        });
        if (!favoriteAdded) {
            res.status(404).json("not found");
        }
        res.status(201).json({ message: 'favorite added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports.deleteFavorite = async (req, res) => {
    try {
        const { favoriteId, id } = req.body;
        const deletedId = await userModel.findByIdAndUpdate(id, {
            $pull: {
                favorites: favoriteId,
            }
        });
        if (!deletedId) {
            res.status(404).json("Not Found");
        }
        res.status(201).json({ message: "favorite deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}