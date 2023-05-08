import { connect } from 'mongoose';
import config from 'config';

const connectDb = async () => {
  try {
    await connect( config.get("MONGODB_URI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB database connected...');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDb;