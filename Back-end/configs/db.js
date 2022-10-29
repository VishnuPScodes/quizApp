import mongoose from "mongoose";

const connect = () => {
  return mongoose.connect(
    process.env.URL
  );
};

export default connect;
