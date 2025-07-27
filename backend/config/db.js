const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(
      secrets.DB_URL
    )
    .then(() => {
      console.log("DB connected successfully.");
    })
    .catch((error) => {
      console.log("DB Error: ", error);
    });
};

module.exports = connectDB;
