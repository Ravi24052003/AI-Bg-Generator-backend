const {v2} = require("cloudinary");
const fs = require("fs");
const cloudinary = v2;

cloudinary.config({ 
    cloud_name: 'dmofunrex', 
    api_key: '983299355199791', 
    api_secret: 'sTcYUDpBRuc8LXXekb0IUaKr2N0' 
  });



  const uploadOnCloudinary = async (localFilePath)=>{
    try {
      if(!localFilePath) return null;
      console.log("cloudinary.js uploadOnCloudinary localFilePath ->", localFilePath)
      // upload the file on cloudinary
     const response = await cloudinary.uploader.upload(localFilePath,
        {resource_type: "auto"}
        );
      // file has been uploaded successfully
      console.log("cloudinary.js file is uploaded on cloudinary response -> ", response);
    
      fs.unlinkSync(localFilePath);
      
      return response;
    } catch (error) {
      fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
    
      return null;
    }
    }

module.exports = uploadOnCloudinary