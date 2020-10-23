import { Request, Response } from "express";
import Contact, { IContact } from "../../models/contact";

export const Create=async(req:Request,res:Response)=>{
    let {firstName,lastName,email,contactNumber}=req.body;
    let contactNew:IContact=new Contact({user:req.userId,firstName,lastName,email,contactNumber});

    try {
        let contactSaved:IContact=await  contactNew.save();
        res.status(200).json(contactSaved);
    } catch (error) {
        res.status(500).json({message:"Error adding user"})    
    }
}