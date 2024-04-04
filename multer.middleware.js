const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log("multer.middleware.js destination -> ", "file --> ", file, "cb --> ", cb )
      cb(null, "./uploads")
    },
    filename: function (req, file, cb) {
      console.log("multer.middleware.js filename -> ","file -->", file,"cb --> ", cb )
      const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniquePrefix + path.extname(file.originalname))
    }
  })
  
const upload = multer({ storage })
module.exports = upload