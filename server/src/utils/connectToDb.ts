import mongoose from 'mongoose';

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO || '');
    console.log('Connected to db succesfull');
  } catch (error) {
    console.log(error);
  }
};

export default connectToDb;
