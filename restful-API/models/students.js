const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  age: {
    type: Number,
    default: 18,
    min: [18, "You are too young to be a student"],
    max: [80, "You are too old to be a student"],
  },
  scholarship: {
    merit: {
      type: Number,
      min: 0,
      max: 10000,
      default: 0,
    },
    other: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
