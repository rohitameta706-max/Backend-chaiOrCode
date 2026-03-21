import { v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLONE_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (loclaFilePath) => {
    try{
       if(!loclaFilePath) return null
     const response = await cloudinary.uploader.upload(loclaFilePath, {
        resource_type:"auto"
    })
    //file has been uploaded successfully
    console.log("file has benn uploaded on cloudinary successfully",
        response.url
    );
    return response;
    }
    catch(error){
         fs.unlinkSync(loclaFilePath)//remove the locally saved temporary file as the upload operation got failed
         return null;
    }
}

// cloudinary.v2.uploader
// .upload("dog.mp4", {
//   resource_type: "video", 
//   public_id: "my_dog",
//   overwrite: true, 
//   notification_url: "https://mysite.example.com/notify_endpoint"})
// .then(result=>console.log(result));

export {uploadOnCloudinary}