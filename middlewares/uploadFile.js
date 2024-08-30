const multer = require("multer");
const path = require("path");
const fs = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath;
        if (file.fieldname === "profilePic") {
            uploadPath = 'public/images/uploadedImages';
        } else if (file.fieldname === "cv") {
            uploadPath = 'public/documents/cv';
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const originalName = file.originalname;
        const fileExtension = path.extname(originalName);
        let uploadPath;

        if (file.fieldname === "profilePic") {
            uploadPath = 'public/images/uploadedImages';
        } else if (file.fieldname === "cv") {
            uploadPath = 'public/documents/cv';
        }

        let fileName = originalName;
        let fileIndex = 1;
        while (fs.existsSync(path.join(uploadPath, fileName))) {
            const baseName = path.basename(originalName, fileExtension);
            fileName = `${baseName}_${fileIndex}${fileExtension}`;
            fileIndex++;
        }
        cb(null, fileName);
    }
});

var uploadImagesUsers = multer({ storage: storage });
module.exports = uploadImagesUsers;
