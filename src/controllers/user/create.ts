import { Request, Response } from "express";
import User,{IUser} from "../../models/user";

export const Create=async(req:Request,res:Response)=>{
    let {name,email,password}=req.body;
    let userNew:IUser=new User({name,email,password});    

    try {
        userNew.password=await userNew.encriptPassword(password);
        let userSaved:IUser=await  userNew.save();
        res.status(200).json(userSaved);
    } catch (error) {
        res.status(500).json({message:"Error adding user"})    
    }
}