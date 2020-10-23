import { model, Document, Schema, Types } from "mongoose";
import  bcrypt  from "bcryptjs";
export interface IUser extends Document{
    name:string,
    email:string,
    password:string,
    encriptPassword(password:string):Promise<string>;
    validatePassword(password:string):Promise<boolean>;
}

const userSchema=new Schema(
    {
        name:{
            type:String,
            maxlength:150,
        },
        email:{
            type:String,
            maxlength:150,
            unique:true
        },
        password:{
            type:String,
            maxlength:150,
        }
    }
);


userSchema.methods.encriptPassword=async(password:string):Promise<string>=>{
    const saltos=await bcrypt.genSalt(10);
    return bcrypt.hash(password,saltos);
}

userSchema.methods.validatePassword=async function(password:string):Promise<boolean>{
    return await bcrypt.compare(password,this.password);
}

export default model<IUser>('user',userSchema);