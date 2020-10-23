import { Request, Response } from "express";
import Contact, { IContact } from "../../models/contact";
import User,{ IUser } from "../../models/user";

export const Read = async (req: Request, res: Response) => {    
    //Verify if exist the user loged but delited and is necesary to search contact object
    let userResult:IUser|null= await User.findOne({_id:req.userId});
    if(!userResult) return res.status(404).json({message:"User deleted."});

    try {
        let contactList:Array<IContact>=await Contact.find({user:userResult});
        res.status(200).json({contactList});
    } catch (error) {
        res.status(500).json({ message: "Error adding user" });
    }
}