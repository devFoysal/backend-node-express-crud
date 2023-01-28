const { diskStorage } = require("multer");
const path = require("path");
const storage = (customPath) =>
  diskStorage({
    destination: `./public/uploads/${customPath}`,
    filename: (req, file, cb) => {
      return cb(null, `${Date.now()}${path?.extname(file?.originalname)}`);
    },
  });

module.exports = { storage };
