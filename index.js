const express = require("express");
const cors = require("cors");
const app = express();
const upload = require("./multer.middleware.js");
const mongoose = require("mongoose");
const uploadOnCloudinary = require("./cloudinary.js");
const Image = require("./images.model.js");


const PORT = 8080;

app.use(cors());
app.use(express.static("public"));
app.use(express.static("uploads"));

main().catch(err => console.log("Error in database ->",err));
async function main() {
  await mongoose.connect("mongodb://localhost:27017/imagesDb");
  console.log('database connected'); 
}


app.post("/image", upload.single("avatar"), async function(req, res, next){
    console.log("req.file after",req.file, "req.body after ", req.body);

    // res.json(req.file)

    const localFilePath = req.file?.path;

   const response = await uploadOnCloudinary(localFilePath);

   console.log("index.js app.post response",response);

   console.log("index.js app.post response", response?.secure_url);

   const image = new Image();
   image.imageUrl = response?.secure_url;

   await image.save();

   res.status(201).json({imageUrl: image.imageUrl});
})

app.get("/images", async function(req, res, next){
    const imagesArray = await Image.find();

    console.log("imagesArray",imagesArray);

    res.status(200).json({imagesArray: imagesArray})
})



app.listen(PORT, ()=>{
    console.log("server started at ", + PORT)
})