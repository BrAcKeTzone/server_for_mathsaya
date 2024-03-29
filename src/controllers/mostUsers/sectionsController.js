const RoomSection = require("../../models/RoomSectionModel");

async function addSection(req, res) {
  try {
    const { sectionName, schoolYear, userId } = req.body;

    const newRoomSection = await RoomSection.create({
      sectionName,
      schoolYear,
      userId,
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

async function editSection(req, res) {
  try {
    const { sectionId } = req.params;
    const updatedData = req.body;

    const section = await RoomSection.findByPk(sectionId);

    if (!section) {
      res.status(404).json({ error: "Section not found" });
      return;
    }

    await section.update(updatedData);

    res.json(section);
  } catch (error) {
    console.error("Error during section edit:", error);
    res.status(500).json({ error: "Section edit failed" });
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
    const { userId } = req.params;

    const sections = await RoomSection.findAll({
      where: { userId },
      attributes: [
        "sectionId",
        "sectionName",
        "schoolYear",
        "userId",
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
  editSection,
  deleteSection,
  getSectionsByTeacher,
};
