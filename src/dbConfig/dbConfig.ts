import mongoose from "mongoose";

export async function connect() {
  try {
    if (process.env.MONGO_URI !== undefined) {
      mongoose.connect(process.env.MONGO_URI);
      const connection = mongoose.connection;

      connection.on('connect', ()=>{
        console.log('MongoDB connected')
      })

      connection.on('error', (err)=>{
        console.log('MongoDB connection error, please make sure that the database is up and running: '+ err);
        process.exit();
      })
    } else {
      throw new Error("Please provide a MongoDB uri. (uri is undefined)");
    }
  } catch (error) {
    console.log("Something went wrong while connecting to database.");
    console.log(error);
  }
}
