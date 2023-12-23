const RoomSection = require("../../models/RoomSectionModel");
const Teacher = require("../../models/TeacherModel");

async function addSection(req, res) {
  try {
    const { sectionName, schoolYear, teacherId } = req.body;

    const sectionId = `${schoolYear} ${sectionName}`;

    const newRoomSection = await RoomSection.create({
      sectionId,
      sectionName,
      schoolYear,
      teacherId,
      totalStudents: 0,
    });

    res.status(201).json(newRoomSection);
  } catch (error) {
    console.error("Error during room section addition:", error);
    res.status(500).json({ error: "Room section addition failed" });
  }
}

async function viewSection(req, res) {
  try {
    const { sectionId } = req.params;

    const roomSection = await RoomSection.findByPk(sectionId);

    if (!roomSection) {
      res.status(404).json({ error: "Room section not found" });
    } else {
      res.json(roomSection);
    }
  } catch (error) {
    console.error("Error during room section view:", error);
    res.status(500).json({ error: "Room section retrieval failed" });
  }
}

async function deleteSection(req, res) {
  try {
    const { sectionId } = req.params;

    const deletedCount = await RoomSection.destroy({
      where: { sectionId },
    });

    if (deletedCount === 0) {
      res.status(404).json({ error: "Room section not found" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.error("Error during room section deletion:", error);
    res.status(500).json({ error: "Room section deletion failed" });
  }
}

async function getSectionsByTeacher(req, res) {
  try {
    const { teacherId } = req.params;

    const teacher = await Teacher.findByPk(teacherId);

    if (!teacher) {
      res.status(404).json({ error: "Teacher not found" });
      return;
    }

    const sections = await RoomSection.findAll({
      where: { teacherId },
      attributes: [
        "sectionId",
        "sectionName",
        "schoolYear",
        "teacherId",
        "totalStudents",
      ],
      order: [["schoolYear", "ASC"]],
    });

    res.json(sections);
  } catch (error) {
    console.error("Error getting sections for teacher:", error);
    res.status(500).json({ error: "Failed to get section" });
  }
}

module.exports = {
  addSection,
  viewSection,
  deleteSection,
  getSectionsByTeacher,
};
