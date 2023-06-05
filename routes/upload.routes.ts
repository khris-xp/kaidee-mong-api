const uploadRouter = require('express').Router();
const cloudinary = require('cloudinary').v2;
import cloudinaryResult from 'cloudinary';
import { Request, Response } from 'express';
import fs from 'fs';
import authUser from '../middleware/auth';
import authAdmin from '../middleware/authAdmin';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

uploadRouter.post('/upload', authUser, authAdmin, (req: Request, res: Response) => {
    try {

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ msg: "No files were uploaded." });
        }

        const file = Array.isArray(req.files.file) ? req.files.file[0] : req.files.file;

        if (file.size > 1024 * 1024) {
            removeTmp(file.tempFilePath);
            return res.status(400).json({ msg: "Size too large." });
        }

        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            removeTmp(file.tempFilePath);
            return res.status(400).json({ msg: "File format is incorrect." });
        }

        cloudinary.uploader.upload(file.tempFilePath, { folder: "KAIDEE MONG" }, async (err: cloudinaryResult.UploadApiErrorResponse | null, result: cloudinaryResult.UploadApiResponse | undefined) => {
            if (err) throw err;
            removeTmp(file.tempFilePath);
            res.json({ public_id: result?.public_id, url: result?.secure_url });
        })
    } catch (err: any) {
        return res.status(500).json({ msg: err.message });
    }
})

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
