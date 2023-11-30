const express = require("express");
const router = express.Router();
const Yunit = require("../models/YunitModel");
const multer = require("multer");
const path = require("path");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig");

// Define storage for uploaded files using Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "yunits", // Folder where images will be stored in Cloudinary
    format: async (req, file) => "png", // You can change the format as needed
    public_id: (req, file) => {
      // You can customize the public_id here if needed
      return `yunit_${Date.now()}`;
    },
  },
  timeout: 60000, // in milliseconds
});
const upload = multer({ storage: storage });

// Route for adding a new Yunit with an uploaded image
router.post("/add", upload.single("yunitThumbnail"), async (req, res) => {
  try {
    console.log("req.file:", req.file); // Add this line to log req.file

    const { yunitNumber, yunitName, teacherId } = req.body;

    // Check if a Yunit with the same yunitNumber and teacherId already exists
    const existingYunit = await Yunit.findOne({
      where: { yunitNumber, teacherId },
    });

    if (existingYunit) {
      return res.status(400).json({
        error: "Yunit with the same number and teacher already exists",
      });
    }

    const yunitTitle = `[${yunitNumber}] ${yunitName}`;

    const newYunitData = {
      yunitTitle,
      yunitNumber,
      yunitName,
      teacherId,
    };

    // Check if a file was uploaded
    if (req.file) {
      // Set the yunitThumbnail field to the Cloudinary URL
      newYunitData.yunitThumbnail = req.file.path;

      // Retrieve and store the public_id in the newYunitData
      newYunitData.public_id = req.file.filename;
    }

    const newYunit = await Yunit.create(newYunitData);

    res.status(201).json(newYunit);
  } catch (error) {
    console.error("Error during Yunit addition:", error);
    res.status(500).json({ error: "Yunit addition failed" });
  }
});

// Route for viewing a Yunit by ID
router.get("/view/:yunitId", async (req, res) => {
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
});

// Route for editing (updating) a Yunit by ID
router.put(
  "/edit/:yunitId",
  upload.single("yunitThumbnail"),
  async (req, res) => {
    try {
      const { yunitId } = req.params;
      const updatedData = req.body;

      const yunit = await Yunit.findByPk(yunitId);

      if (!yunit) {
        res.status(404).json({ error: "Yunit not found" });
        return;
      }

      // If a new file is uploaded, handle it
      if (req.file) {
        // Remove the old image file from Cloudinary, if it exists
        if (yunit.yunitThumbnail && yunit.public_id) {
          await cloudinary.uploader.destroy(yunit.public_id);
        }

        // Set the yunitThumbnail field to the Cloudinary URL of the new file
        updatedData.yunitThumbnail = req.file.path;

        // Update the public_id with the new file's public_id
        updatedData.public_id = req.file.filename;
      }

      // Update Yunit with the provided data
      await yunit.update(updatedData);

      res.json(yunit);
    } catch (error) {
      console.error("Error during Yunit edit:", error);
      res.status(500).json({ error: "Yunit edit failed" });
    }
  }
);

// Route for deleting a Yunit by ID
router.delete("/delete/:yunitId", async (req, res) => {
  try {
    const { yunitId } = req.params;

    // Find the Yunit by ID to get the associated thumbnail filename and public_id
    const yunit = await Yunit.findByPk(yunitId);

    if (!yunit) {
      res.status(404).json({ error: "Yunit not found" });
      return;
    }

    // Delete the Yunit from the database
    const deletedCount = await Yunit.destroy({ where: { yunitId } });

    if (deletedCount === 0) {
      res.status(404).json({ error: "Yunit not found" });
    } else {
      if (yunit.yunitThumbnail && yunit.public_id) {
        // Check if a thumbnail file is associated with the Yunit
        // Delete the associated thumbnail file from Cloudinary
        await cloudinary.uploader.destroy(yunit.public_id);
      }
      res.status(204).send();
    }
  } catch (error) {
    console.error("Error during Yunit deletion:", error);
    res.status(500).json({ error: "Yunit deletion failed" });
  }
});

// Route to get all Yunits for a specific teacher
router.get("/yunits/:teacherId", async (req, res) => {
  try {
    const { teacherId } = req.params;

    const yunits = await Yunit.findAll({
      where: { teacherId },
      attributes: [
        "yunitId",
        "yunitTitle",
        "yunitNumber",
        "yunitName",
        "yunitThumbnail",
      ],
      order: [["yunitTitle", "ASC"]],
    });

    res.json(yunits);
  } catch (error) {
    console.error("Error getting Yunits for teacher:", error);
    res.status(500).json({ error: "Failed to get Yunits" });
  }
});

module.exports = router;