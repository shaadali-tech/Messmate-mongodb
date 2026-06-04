const express = require("express");
const router = express.Router();
const validateObjectId = require("../middleware/validateobjectid");
const Student = require("../models/Student");

module.exports = router;

router.post("/", async (req, res) => {
  try {
    const { name, standard } = req.body;
    const student = new Student({ name, standard });
    const saved = await student.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Bad request or missing fields" });
  }
});

router.put("/:id", validateObjectId, async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: "Bad request or missing fields" });
  }
});

router.delete("/:id", validateObjectId, async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(400).json({ message: "Bad request or missing fields" });
  }
});

router.get("/:id", validateObjectId, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: "Bad request or missing fields" });
  }
});

router.get("/", validateObjectId, async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(400).json({ message: "Bad request or missing fields" });
  }
});
