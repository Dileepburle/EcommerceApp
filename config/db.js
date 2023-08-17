import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () =>{
    try{
        const conn = await mongoose.connect("mongodb+srv://dileepswaroopa555:rUHg2KXmrfT6DOK4@cluster0.nnqy4qo.mongodb.net/ecommerce");
        console.log(`Connected To Mongodb Database ${conn.connection.host}`);
    }catch(error){
        console.log(`Error in Mongodb ${error}`.bgRed.white);
    }
};
export default connectDB;