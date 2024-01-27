const RoomSection = require("../../models/RoomSectionModel");

async function addSection(req, res) {
  try {
    const { sectionName, schoolYear, userId } = req.body;

    const sectionId = `${schoolYear} ${sectionName}`;

    const newRoomSection = await RoomSection.create({
      sectionId,
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
    const { sectionName, schoolYear, userId } = req.body;

    const updatedRoomSection = await RoomSection.update(
      {
        sectionName,
        schoolYear,
        userId,
      },
      {
        where: { sectionId },
        returning: true,
      }
    );

    if (updatedRoomSection[0] === 0) {
      res.status(404).json({ error: "Room section not found" });
    } else {
      res.json(updatedRoomSection[1][0]); // Return the updated room section
    }
  } catch (error) {
    console.error("Error during room section edit:", error);
    res.status(500).json({ error: "Room section edit failed" });
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
