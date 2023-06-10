const Content = require('../models/content.model');
import { Request, Response } from "express";

const contentController = {
    getContents: async (req: Request, res: Response) => {
        try {
            const contents = await Content.find();
            res.json(contents);
        } catch (err: any) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createContent: async (req: Request, res: Response) => {
        try {
            const { content_id, title, description, category, videos } = req.body;
            if (!videos) return res.status(400).json({ msg: "No video upload" });

            const content = await Content.findOne({ content_id });

            const newContent = new Content({
                content_id, title, description, category, videos
            });

            await newContent.save();

            res.json({ msg: "Created a content" });

        } catch (err: any) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteContent: async (req: Request, res: Response) => {
        try {
            await Content.findByIdAndDelete(req.params.id);
            res.json({ msg: "Deleted a Content" });
        } catch (err: any) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateContent: async (req: Request, res: Response) => {
        try {
            const { content_id, title, description, category, videos } = req.body;
            if (!videos) return res.status(400).json({ msg: "No video upload" });

            await Content.findOneAndUpdate({ _id: req.params.id }, {
                content_id, title, description, category, videos
            });

            res.json({ msg: "Updated a Content" });
        } catch (err: any) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = contentController;
