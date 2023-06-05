import { ObjectId } from "mongoose";

export interface IUser {
    _id: ObjectId;
    id: ObjectId;
    name: string;
    email: string;
    password: string;
    role: number;
    cart: Array<Object>;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
    __v: number;
}