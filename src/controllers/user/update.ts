import { Response, Request } from "express";
import User, { IUser } from "../../models/user";

export const Update=async(req:Request,res:Response)=>{
    let {name,password}=req.body;
    //asking for user in the validation token
    let userResult:IUser|null=await User.findOne({_id:req.userId});
    if(!userResult) return res.status(404).json({message:"The User don't exist."});

    //validate the password is de same or not to encrypt depending it
    if(userResult.password!==password){
        userResult.password=await userResult.encriptPassword(password);
    }
    //adding name field
    userResult.name=name;

    let userUpdated:IUser=await userResult.update(userResult);
    
    res.status(200).json({message:"User updated succesfuly."})

}