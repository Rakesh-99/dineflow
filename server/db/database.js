import mongoose from "mongoose";




const connectToDB = async (connection_string) => {
    try {
        await mongoose.connect(connection_string);
        console.log(`DB connected successfully`);
    } catch (error) {
        console.log(`could not connect to DB , ${error}`);
    }
}; 


export default connectToDB;