import { Request, Response,NextFunction } from "express";
import { IPayload } from "../interfaces/payload";
import { validateToken } from "../libs/tokenValidator";

export const userAuth=async(req:Request, res:Response,next:NextFunction)=>{
    //validating if exist token
    let token:string|undefined = req.header("auth-token");
    if(!token) return res.status(504).json({message:"Permission Denided"})

    const payload: IPayload | null = validateToken(token);
    if (!payload) return res.status(404).json({ message: "Acceso Denegado." });
    req.userId = payload._id;

    next();
}