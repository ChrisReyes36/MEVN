import mongoose from "mongoose";

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.URI_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`😎 MongoDB Connected: ${conn.connection.db.databaseName} 😎`);
  } catch (error) {
    console.error(`😢 Error: ${error.message} 😢`);
    process.exit(1);
  }
};

connectDB();
