import mongoose from "mongoose";

const connectDB = async () => {

    try{
        const connection = await mongoose.connect("mongodb+srv://dikshitmahanot2005:dik123@backendtry.fltc2.mongodb.net/?retryWrites=true&w=majority&appName=BackendTry");
          console.log("mongodb connection");
        

    }catch(e){
        console.error(e);
        process.exit(1);
    }
    
}

export default connectDB;