import { model,Document,Schema,Types } from "mongoose";
import { IUser } from "./user";

export interface ITicket extends Document{
    user:IUser,
    used:boolean;
}

const ticketModel=new Schema(
    {
        user:{type:Types.ObjectId,ref:"user",required:true},
        used:{type:Boolean, default:false}
    }
)

export default model<ITicket>("ticket",ticketModel);

