const parseFormData = (req, res, next) => {
    if (req.body.availability) {
      try {
        req.body.availability = JSON.parse(req.body.availability);
        next();
      } catch (error) {
        res.status(500).json({ message: 'Error parsing availability data', error });
      }
    } else {
      next();
    }
  };
  
  module.exports = parseFormData;
  