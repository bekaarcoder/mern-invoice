import express from 'express';
import multer from 'multer';
import cloudinaryUploader from '../config/cloudinaryConfig.js';
import uploadImage from '../helpers/multer.js';

const router = express.Router();

router.route('/').patch(uploadImage.single('logo'), async (req, res) => {
    const localFilePath = req.file.path;
    const result = await cloudinaryUploader(localFilePath);

    res.status(200).json({
        success: true,
        url: result.url,
    });
});

export default router;
