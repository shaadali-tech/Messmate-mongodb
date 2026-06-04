const express = require("express");
const mongoose = require("mongoose");
const studentRoutes = require("./routes/studentRoutes");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/students", studentRoutes);
async function dbconnection() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to Database");

    app.listen(process.env.PORT || 8000, () => {
      console.log("Server Started");
    });
  } catch (error) {
    console.log("Error occurred");
    console.log(error.message);
  }
}

dbconnection();

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Unexpected server error",
  });
});
