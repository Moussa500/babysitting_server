const parseFormData = (req, res, next) => {
    try {
        if (req.body.availability) {
            req.body.availability = JSON.parse(req.body.availability);
        }
        if (req.body.children) {
            req.body.children = JSON.parse(req.body.children);
        }
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = parseFormData;
