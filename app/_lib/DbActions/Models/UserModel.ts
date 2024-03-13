import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6, 
  },
  // Add other fields as needed (e.g., profile picture URL, bio, etc.)
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps


 const User = mongoose.models?.User || mongoose.model('User', userSchema);
 export default User;