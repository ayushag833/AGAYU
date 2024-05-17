import mongoose from "mongoose";

const connect = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to Database successfully!");
    })
    .catch((error) => {
      console.log("Error while connecting to Database", error.message);
      process.exit(1);
    });
};
export default connect;
