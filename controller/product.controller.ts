const Products = require('../models/product.model');
import { Request, Response } from "express";

const productController = {
    getProducts: async (req: Request, res: Response) => {
        try {
            const products = await Products.find();
            res.json(products);
        } catch (err: any) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createProduct: async (req: Request, res: Response) => {
        try {
            const { product_id, title, price, description, content, images, category } = req.body;
            if (!images) return res.status(400).json({ msg: "No image upload" });

            const product = await Products.findOne({ product_id })
            if (product) return res.status(400).json({ msg: "This product already exists." });

            const newProduct = new Products({
                product_id, title: title.toLowerCase(), price, description, content, images, category
            });

            await newProduct.save();

            res.json({ msg: "Created a product" });

        } catch (err: any) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteProduct: async (req: Request, res: Response) => {
        try {
            await Products.findByIdAndDelete(req.params.id);
            res.json({ msg: "Deleted a Product" });
        } catch (err: any) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateProduct: async (req: Request, res: Response) => {
        try {
            const { product_id, title, price, description, content, images, category } = req.body;
            if (!images) return res.status(400).json({ msg: "No image upload" });

            await Products.findOneAndUpdate({ _id: req.params.id }, {
                product_id, title: title.toLowerCase(), price, description, content, images, category
            });

            res.json({ msg: "Updated a Product" });
        } catch (err: any) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = productController;