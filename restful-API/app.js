const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Student = require("./models/students");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://localhost:27017/mongoDB-practice")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((e) => {
    console.log(e);
  });

app.get("/students", async (req, res) => {
  try {
    let studentData = await Student.find({}).exec();
    return res.send(studentData);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error");
  }
});

app.get("/students/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let student = await Student.findOne({ _id }).exec();
    return res.send(student);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error");
  }
});

app.post("/students", async (req, res) => {
  let { name, age, major, merit, other } = req.body;
  try {
    let student = await Student.create({
      name,
      age,
      major,
      scholarship: {
        merit,
        other,
      },
    });
    let savedStudent = await student.save();
    return res.send({ msg: "Student created", savedStudent });
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error");
  }
});

app.put("/students/:_id", async (req, res) => {
  let { _id } = req.params;
  let { name, age, major, merit, other } = req.body;
  try {
    let newStudent = await Student.findOneAndUpdate(
      { _id },
      { name, age, major, scholarship: { merit, other } },
      { new: true, runValidators: true, overwrite: true }
    ).exec();
    return res.send({ msg: "Student updated", updatedData: newStudent });
  } catch (e) {
    console.log(e);
    return res.status(400).send(e.message);
  }
});

app.patch("/students/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let { name, age, major, merit, other } = req.body;
    let newStudent = await Student.findByIdAndUpdate(
      { _id },
      {
        name,
        age,
        major,
        "scholarship.merit": merit,
        "scholarship.other": other,
      },
      { new: true, runValidators: true }
    );
    return res.send({ msg: "Student updated", updatedData: newStudent });
  } catch (e) {
    console.log(e);
    return res.status(400).send(e.message);
  }
});

app.delete("/students/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let deletedStudent = await Student.deleteOne({ _id });
    if (deletedStudent.deletedCount === 0) {
      return res.send({ msg: "Student not found", deletedStudent });
    }
    return res.send({ msg: "Student deleted", deletedStudent });
  } catch (e) {
    return res.status(500).send(e);
  }
});

app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
