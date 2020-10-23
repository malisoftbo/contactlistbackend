import { Request } from "express";

import jwt from "jsonwebtoken"
import { IPayload } from "../interfaces/payload";

export const validateToken = (token: string): IPayload | null => {
    
    if (!token) return null
    try {
        const payload: IPayload = jwt.verify(token, process.env.TOKEN_SECRET || "secret-token-default") as IPayload;
        //req.userId = payload._id;
        return payload
    } catch (error) {
        return null
    }
}