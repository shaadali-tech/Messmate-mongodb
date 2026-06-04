const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    standard: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
