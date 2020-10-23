import { Request, Response } from "express";
import Contact, { IContact } from "../../models/contact";
import User,{ IUser } from "../../models/user";

export const Update = async (req: Request, res: Response) => {
    let { _id, firstName, lastName, email, contactNumber } = req.body;
    
    //Verify if exist the user loged but deleted and is necesary to search contact object
    let userResult:IUser|null= await User.findOne({_id:req.userId});
    if(!userResult) return res.status(404).json({message:"User deleted."});

    try {
        let contactUpdated:IContact=await Contact.updateOne({_id,user:userResult},{$set:{firstName,lastName,email,contactNumber}});
        console.log("result of update operation");
        console.log(contactUpdated);
        res.status(200).json({message:"Updated Successfuly."});
    } catch (error) {
        res.status(500).json({ message: "Error Updating Contact" });
    }
}