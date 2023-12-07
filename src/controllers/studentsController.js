const Student = require("../models/StudentModel");
const RoomSection = require("../models/RoomSectionModel");
const { v4: uuidv4 } = require("uuid");

async function addStudent(req, res) {
  try {
    const { firstname, lastname, username, gender, sectionId, teacherId } =
      req.body;
    const profileId = uuidv4();

    const newStudent = await Student.create({
      firstname,
      lastname,
      username,
      gender,
      sectionId,
      teacherId,
      profileId,
    });

    const section = await RoomSection.findByPk(sectionId);
    if (section) {
      section.totalStudents += 1;
      await section.save();
    }

    res.status(201).json(newStudent);
  } catch (error) {
    console.error("Error during student addition:", error);
    res.status(500).json({ error: "Student addition failed" });
  }
}

async function editStudent(req, res) {
  try {
    const { studentId } = req.params;
    const updatedData = req.body;

    const student = await Student.findByPk(studentId);

    if (!student) {
      res.status(404).json({ error: "Student not found" });
      return;
    }

    await student.update(updatedData);

    res.json(student);
  } catch (error) {
    console.error("Error during student edit:", error);
    res.status(500).json({ error: "Student edit failed" });
  }
}

async function viewStudent(req, res) {
  try {
    const { studentId } = req.params;

    const student = await Student.findByPk(studentId);

    if (!student) {
      res.status(404).json({ error: "Student not found" });
    } else {
      res.json(student);
    }
  } catch (error) {
    console.error("Error during student view:", error);
    res.status(500).json({ error: "Student retrieval failed" });
  }
}

async function deleteStudent(req, res) {
  try {
    const { studentId } = req.params;

    const deletedStudent = await Student.findByPk(studentId);

    if (!deletedStudent) {
      res.status(404).json({ error: "Student not found" });
    } else {
      const { sectionId } = deletedStudent;

      await Student.destroy({ where: { studentId } });

      const section = await RoomSection.findByPk(sectionId);
      if (section) {
        section.totalStudents -= 1;
        await section.save();
      }

      res.status(204).send();
    }
  } catch (error) {
    console.error("Error during student deletion:", error);
    res.status(500).json({ error: "Student deletion failed" });
  }
}

async function getStudentsBySection(req, res) {
  try {
    const { sectionId } = req.params;

    const students = await Student.findAll({
      where: { sectionId },
      order: [["lastname", "ASC"]],
    });

    res.json(students);
  } catch (error) {
    console.error("Error getting students for section:", error);
    res.status(500).json({ error: "Failed to get students" });
  }
}

module.exports = {
  addStudent,
  editStudent,
  viewStudent,
  deleteStudent,
  getStudentsBySection,
};
