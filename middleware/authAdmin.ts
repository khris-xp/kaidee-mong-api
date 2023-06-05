const Users = require('../models/users.model');
import { NextFunction, Request, Response } from "express";
import { IUser } from "../interface/user";

interface AuthRequest extends Request {
    user?: IUser;
}

const authAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return res.status(401).json({ msg: "Unauthorized" });
        }
        const user = await Users.findOne({
            _id: req.user._id
        });

        if (user.role === 0) return res.status(400).json({ msg: "Admin resources access denied." });

        next();
    } catch (err: any) {
        return res.status(500).json({ msg: err.message });
    }
}

module.exports = authAdmin;