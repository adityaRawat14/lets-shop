import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connectionString = process.env.MONGODB_URI

 const dbConnect=async ()=>{
  if (!mongoose.connections[connectionString]) {
    try {
      
      await mongoose.connect(connectionString);
      
    } catch (error) {
      console.error('MongoDB connection failed:', error);
      process.exit(1);
    }
  }
}





// if (!connectionString) {
//   throw new Error(
//     'Please define the MONGODB_URI environment variable inside .env.local'
//   )
// }

// /**
//  * Global is used here to maintain a cached connection across hot reloads
//  * in development. This prevents connections growing exponentially
//  * during API Route usage.
//  */
// let cached = global.mongoose

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null }
// }

// async function dbConnect () {
//   if (cached.conn) {
//     return cached.conn
//   }

//   if (!cached.promise) {
//     const opts = {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       bufferCommands: false,
//       bufferMaxEntries: 0,
//       useFindAndModify: true,
//       useCreateIndex: true
//     }

//     cached.promise = mongoose.connect(connectionString, opts).then(mongoose => {
//       return mongoose
//     })
//   }
//   cached.conn = await cached.promise
//   console.log('db connected');
  
//   return cached.conn
// }

export default dbConnect