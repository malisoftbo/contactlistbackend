import mongoose from "mongoose";
const _URLDB = process.env.URLDB || "mongodb+srv://tustienditas:9a4ktYrNWkpau8xC@tustienditasdb-yfjhw.gcp.mongodb.net/contactlist?retryWrites=true&w=majority"

mongoose.connect(_URLDB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
}).then(db=>{
    console.log("Database conneted Successfuly.")
}).catch(error=>{
    console.log("There are errors tryning connecto to the database.");
    console.error(error);
})