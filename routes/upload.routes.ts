const uploadRouter = require('express').Router();
const cloudinary = require('cloudinary').v2;
import cloudinaryResult from 'cloudinary';
import { Request, Response } from 'express';
import fs, { ReadStream } from 'fs';
import authUser from '../middleware/auth';
import authAdmin from '../middleware/authAdmin';
const multer = require('multer');
const streamifier = require('streamifier');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const upload = multer({ dest: 'temp/' });

uploadRouter.post('/upload', authUser, authAdmin, (req: Request, res: Response) => {
    try {

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ msg: "No files were uploaded." });
        }

        const fileStream = streamifier.createReadStream(req.files.buffer);

        const file = Array.isArray(req.files.file) ? req.files.file[0] : req.files.file;

        cloudinary.uploader.upload(file.tempFilePath, { folder: "KAIDEE MONG" }, async (err: cloudinaryResult.UploadApiErrorResponse | null, result: cloudinaryResult.UploadApiResponse | undefined) => {
            if (err) throw err;
            removeTmp(file.tempFilePath);
            res.json({ public_id: result?.public_id, url: result?.secure_url });
        })
    } catch (err: any) {
        return res.status(500).json({ msg: err.message });
    }
})

uploadRouter.post('/upload/video', authUser, authAdmin, async (req: Request, res: Response) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ msg: "No files were uploaded." });
        }

        const file = Array.isArray(req.files.file) ? req.files.file[0] : req.files.file;

        const videoStream: string = file.tempFilePath;

        const result = await cloudinary.uploader.upload(videoStream, {
            resource_type: "video",
            folder: "KAIDEE MONG",
            chunk_size: 6000000,
            eager: [
                { streaming_profile: "hd" }
            ]
        });

        removeTmp(file.tempFilePath);
        res.json({ public_id: result?.public_id, url: result?.secure_url });
    } catch (err: any) {
        return res.status(500).json({ msg: err.message });
    }
});
uploadRouter.post('/destroy', authUser, authAdmin, (req: Request, res: Response) => {
    try {
        const { public_id } = req.body;
        if (!public_id) return res.status(400).json({ msg: "No images selected." });

        cloudinary.uploader.destroy(public_id, async (err: cloudinaryResult.UploadApiErrorResponse | null, result: cloudinaryResult.UploadApiResponse | undefined) => {
            if (err) throw err;

            res.json({ msg: "Deleted image" });
        })
    } catch (err: any) {
        return res.status(500).json({ msg: err.message });
    }
})

function removeTmp(tempFilePath: string) {
    fs.unlink(tempFilePath, (err: any) => {
        if (err) throw err;
    })
}

module.exports = uploadRouter;
