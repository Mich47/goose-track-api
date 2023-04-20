const mongoose = require("mongoose");

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.BD_URI);

    console.log("Database connection successful");
  } catch (error) {
    console.error("Error connection: ", error.message);

    process.exit(1);
  }
};

module.exports = connectToMongoDB;
