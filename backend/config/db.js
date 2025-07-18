const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://shashanktechx:admin1234@cluster0.luallp5.mongodb.net/TaskFlow"
    )
    .then(() => {
      console.log("DB connected successfully.");
    })
    .catch((error) => {
      console.log("DB Error: ", error);
    });
};

module.exports = connectDB;
