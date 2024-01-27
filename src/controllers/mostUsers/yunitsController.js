const Yunit = require("../../models/YunitModel");
const cloudinary = require("../../config/cloudinaryConfig");

async function addYunit(req, res) {
  try {
    console.log("req.file:", req.file);

    const { yunitNumber, yunitName, userId } = req.body;

    const existingYunit = await Yunit.findOne({
      where: { yunitNumber, userId },
    });

    if (existingYunit) {
      return res.status(400).json({
        error: "Yunit with the same number and teacher already exists",
      });
    }

    const newYunitData = {
      yunitNumber,
      yunitName,
      userId,
    };

    if (req.file) {
      newYunitData.yunitThumbnail = req.file.path;
      newYunitData.public_id = req.file.filename;
    }

    const newYunit = await Yunit.create(newYunitData);

    res.status(201).json(newYunit);
  } catch (error) {
    console.error("Error during Yunit addition:", error);
    res.status(500).json({ error: "Yunit addition failed" });
  }
}

async function viewYunit(req, res) {
  try {
    const { yunitId } = req.params;

    const yunit = await Yunit.findByPk(yunitId);

    if (!yunit) {
      res.status(404).json({ error: "Yunit not found" });
    } else {
      res.json(yunit);
    }
  } catch (error) {
    console.error("Error during Yunit view:", error);
    res.status(500).json({ error: "Yunit retrieval failed" });
  }
}

async function editYunit(req, res) {
  try {
    const { yunitId } = req.params;
    const updatedData = req.body;

    const yunit = await Yunit.findByPk(yunitId);

    if (!yunit) {
      res.status(404).json({ error: "Yunit not found" });
      return;
    }

    if (req.file) {
      if (yunit.yunitThumbnail && yunit.public_id) {
        await cloudinary.uploader.destroy(yunit.public_id);
      }

      updatedData.yunitThumbnail = req.file.path;
      updatedData.public_id = req.file.filename;
    }

    await yunit.update(updatedData);

    res.json(yunit);
  } catch (error) {
    console.error("Error during Yunit edit:", error);
    res.status(500).json({ error: "Yunit edit failed" });
  }
}

async function deleteYunit(req, res) {
  try {
    const { yunitId } = req.params;

    const yunit = await Yunit.findByPk(yunitId);

    if (!yunit) {
      res.status(404).json({ error: "Yunit not found" });
      return;
    }

    const deletedCount = await Yunit.destroy({ where: { yunitId } });

    if (deletedCount === 0) {
      res.status(404).json({ error: "Yunit not found" });
    } else {
      if (yunit.yunitThumbnail && yunit.public_id) {
        await cloudinary.uploader.destroy(yunit.public_id);
      }
      res.status(204).send();
    }
  } catch (error) {
    console.error("Error during Yunit deletion:", error);
    res.status(500).json({ error: "Yunit deletion failed" });
  }
}

async function getYunitsByTeacher(req, res) {
  try {
    const { userId } = req.params;

    const yunits = await Yunit.findAll({
      where: { userId },
      order: [["yunitNumber", "ASC"]],
    });

    res.json(yunits);
  } catch (error) {
    console.error("Error getting Yunits for teacher:", error);
    res.status(500).json({ error: "Failed to get Yunits" });
  }
}

module.exports = {
  addYunit,
  viewYunit,
  editYunit,
  deleteYunit,
  getYunitsByTeacher,
};
