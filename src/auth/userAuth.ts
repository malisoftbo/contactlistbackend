import { Request, Response,NextFunction } from "express";
export const userAuth=async(req:Request, res:Response,next:NextFunction)=>{
    next();
}