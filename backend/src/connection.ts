import mongoose from "mongoose";

async function connectMogodb(url: string) {
  try {
    await mongoose.connect(url); // Await connection
  } catch (err) {
    console.error("error", err);
  }
}

export { connectMogodb };
