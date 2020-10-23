import { Request, Response } from "express";
import Ticket,{ ITicket } from "../../models/ticket";
import User,{ IUser } from "../../models/user";

export const Update=async(req:Request,res:Response)=>{
    let { _id, password}=req.body;
    
    //checking if parameters is correct
    if(!_id || !password) return res.status(404).json({message:"No correct parameters."});

    //check if exist the ticket
    let ticketResult:ITicket|null=await Ticket.findOne({_id, used:false});
    if(!ticketResult) return res.status(404).json({message:"Ticket Expired or not exist."});

    //asking for user object to update
    let userToUpdate:IUser|null=await User.findOne({_id:ticketResult.user});
    if(!userToUpdate) return res.status(404).json({message:"User deleted on the database."});

    userToUpdate.password=await userToUpdate.encriptPassword(password);
    let userUpdated:IUser=await userToUpdate.update(userToUpdate);
    if(!userUpdated) return res.status(500).json({message:"Something is happend with the server."});

    //here we delete any ticket created for this user
    let ticketsDowns=await Ticket.updateMany({user:userToUpdate._id},{$set:{used:true}});
    console.log(ticketsDowns);
    res.status(200).json({message:"User Updated."});
    //

}