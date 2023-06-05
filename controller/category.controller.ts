const Category = require('../models/category.model');
import { Request, Response } from "express";

const categoryController = {
    getCategories: async (req: Request, res: Response) => {
        try {
            const categories = await Category.find();
            res.json(categories);
        } catch (err: any) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createCategory: async (req: Request, res: Response) => {
        try {
            const { name } = req.body;
            const category = await Category.findOne({ name });
            if (category) return res.status(400).json({ msg: "This category already exists." });

            const newCategory = new Category({ name });

            await newCategory.save();
            res.json({ msg: "Created a category" });
        } catch (err: any) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteCategory: async (req: Request, res: Response) => {
        try {
            await Category.findByIdAndDelete(req.params.id);
            res.json({ msg: "Deleted a category" });
        } catch (err: any) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateCategory: async (req: Request, res: Response) => {
        try {
            const { name } = req.body;
            await Category.findOneAndUpdate({ _id: req.params.id }, { name });

            res.json({ msg: "Updated a category" });
        } catch (err: any) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = categoryController;