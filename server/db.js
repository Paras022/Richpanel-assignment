import mongoose from "mongoose";

const connect = async () => {
    try{
        await mongoose.connect(process.env.DB);
        console.log("databse connected")
    }catch(error){
        console.log(error);
        
    }
}

export default connect;