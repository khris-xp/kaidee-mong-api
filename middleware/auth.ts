const jwt = require('jsonwebtoken');
import { NextFunction, Request, Response } from "express";
import { IUser } from "../interface/user";

interface AuthRequest extends Request {
    user?: IUser;
}

const authUser = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization");
        if (!token) return res.status(400).json({ msg: "Invalid Authentication." });

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: IUser) => {
            if (err) return res.status(400).json({ msg: "Invalid Authentication." });

            req.user = user;
            next();
        });
    } catch (err: any) {
        return res.status(500).json({ msg: err.message });
    }
}

export default authUser;