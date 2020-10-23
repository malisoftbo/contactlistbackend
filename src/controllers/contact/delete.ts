import { Request, Response } from "express";
import { IDeleted } from "../../interfaces/delete";
import Contact, { IContact } from "../../models/contact";
import User,{ IUser } from "../../models/user";

export const Delete = async (req: Request, res: Response) => {
    let { _id } = req.body;
    
    //Verify if exist the user loged but deleted and is necesary to search contact object
    let userResult:IUser|null= await User.findOne({_id:req.userId});
    if(!userResult) return res.status(404).json({message:"User deleted."});

    try {
        let contactDeleted:IDeleted=await Contact.deleteOne({_id,user:userResult});
        console.log("result of delete operation");
        console.log(contactDeleted);
        res.status(200).json({message:"Deleted Successfuly."});
    } catch (error) {
        res.status(500).json({ message: "Error erasing the contact." });
    }
}