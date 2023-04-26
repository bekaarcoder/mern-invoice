import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUploader = async function uploadToCloudinary(localFilePath) {
    const mainFolderName = 'merninvoice';
    const filePathOnCloudinary = mainFolderName + '/' + localFilePath;
    return cloudinary.uploader
        .upload(localFilePath, { public_id: filePathOnCloudinary })
        .then((result) => {
            fs.unlinkSync(localFilePath);
            return {
                message: 'success',
                url: result.url,
            };
        })
        .catch((err) => {
            fs.unlinkSync(localFilePath);
            return {
                message: 'failed',
            };
        });
};

export default cloudinaryUploader;
