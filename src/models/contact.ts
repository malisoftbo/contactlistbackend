import { model,Document,Types,Schema } from "mongoose";
import { IUser } from "./user";

export interface IContact extends Document{
    user:IUser,
    fistname:string,
    lastname:string,
    email:string,
    contactNumber:string,
}

const contactSchema = new Schema(
    {
        user:{
            type:Types.ObjectId,
            ref:"user",
            required:true,
        },
        firstName:{
            type:String,
            maxlength:100
        },
        lastName:{
            type:String,
            maxlength:100
        },
        email:{
            type:String,
            maxlength:150
        },
        contactNumber:{
            type:String,
            maxlength:100,
        }
    }
)

export default model<IContact>("contact",contactSchema);