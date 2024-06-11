import { v2 as cloudinary } from "cloudinary";
import { cloud_name, api_key, api_secret } from "../config.js";

cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret,
    secure: true,
});

export async function uploadImage(filePath) {
    return await cloudinary.uploader.upload(filePath, {
        folder: "blogs",
    });
}

export async function deleteImage(public_id){
    return await cloudinary.uploader.destroy(
        public_id,{
            folder: "blogs"
        }
    )
}