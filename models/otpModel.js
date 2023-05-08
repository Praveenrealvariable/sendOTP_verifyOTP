import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
 // userId :{type: Schema.Types.ObjectId, ref: 'users'},
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      otp: {
        type: String,
        required: true,
      },
      expireAt: {
        type: Date,
        default: Date.now,
       // index: { expires: '5m' }, // expires after 5 minute
      },
      messageId:{
        type: String,
      }
  });
  
 const otpModel =  mongoose.model('otps', otpSchema);

 export default otpModel;