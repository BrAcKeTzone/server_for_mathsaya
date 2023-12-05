const express = require("express");
const router = express.Router();
const Lesson = require("../models/LessonModel");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cloudinary = require("../config/cloudinaryConfig");

// Define storage for uploaded files using Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "mathsaya_uploads/lessons",
    public_id_thumbnail: (req, file) => {
      return `lesson_${Date.now()}`;
    },
    public_id_video: (req, file) => {
      return `lesson_${Date.now()}`;
    },
  },
  allowedFormats: ["jpg", "jpeg", "png", "mp4"], // Specify allowed formats
  timeout: 120000, // in milliseconds
});
const upload = multer({ storage: storage });

// Route for adding lesson entry
router.post("/add", upload.single("lessonThumbnail"), async (req, res) => {
  try {
    console.log("req.file:", req.file); // Add this line to log req.file

    const { lessonNumber, lessonName, lessonDescription, yunitId, teacherId } =
      req.body;

    // Check if a Lesson with the same lessonNumber and teacherId already exists
    const existingLesson = await Lesson.findOne({
      where: { lessonNumber, yunitId, teacherId },
    });

    if (existingLesson) {
      return res.status(400).json({
        error: "Lesson with the same number and teacher already exists",
      });
    }

    const lessonTitle = `[${lessonNumber}] ${lessonName}`;

    const newLessonData = {
      lessonTitle,
      lessonNumber,
      lessonName,
      lessonDescription,
      yunitId,
      teacherId,
    };

    // Check if a thumbnail image was uploaded
    if (req.file) {
      newLessonData.lessonThumbnail = req.file.path;
      newLessonData.public_id_thumbnail = req.file.filename;
    }

    const newLesson = await Lesson.create(newLessonData);
    res.status(201).json(newLesson);
  } catch (error) {
    console.error("Error during Lesson addition:", error);
    res.status(500).json({ error: "Lesson addition failed" });
  }
});

// Route for editing (updating) a Lesson by ID with image replacement
router.put(
  "/edit/:lessonId",
  upload.single("lessonThumbnail"),
  async (req, res) => {
    try {
      const { lessonId } = req.params;
      const updatedData = req.body;

      const lesson = await Lesson.findByPk(lessonId);

      if (!lesson) {
        res.status(404).json({ error: "Lesson not found" });
        return;
      }

      // Handle uploaded files (image only)
      if (req.file) {
        if (lesson.lessonThumbnail && lesson.public_id_thumbnail) {
          await cloudinary.uploader.destroy(lesson.public_id_thumbnail);
        }
        // Set the lessonThumbnail field to the Cloudinary URL
        updatedData.lessonThumbnail = req.file.path;
        updatedData.public_id_thumbnail = req.file.filename;
      }

      await lesson.update(updatedData);

      res.json(lesson);
    } catch (error) {
      console.error("Error during Lesson edit:", error);
      res.status(500).json({ error: "Lesson edit failed" });
    }
  }
);

// Route for updating (editing) a Lesson by ID with video replacement

// Route for viewing a Lesson by yunit ID
router.get("/view/:lessonId", async (req, res) => {
  try {
    const { lessonId } = req.params;

    const lesson = await Lesson.findByPk(lessonId);

    if (!lesson) {
      res.status(404).json({ error: "Lesson not found" });
    } else {
      res.json(lesson);
    }
  } catch (error) {
    console.error("Error during Lesson view:", error);
    res.status(500).json({ error: "Lesson retrieval failed" });
  }
});

// Route for deleting a Lesson by ID along with associated files
router.delete("/delete/:lessonId", async (req, res) => {
  try {
    const { lessonId } = req.params;
    const lesson = await Lesson.findByPk(lessonId);

    if (!lesson) {
      res.status(404).json({ error: "Lesson not found" });
      return;
    }

    // Attempt to delete the lesson from the database
    const deletedCount = await Lesson.destroy({ where: { lessonId } });

    if (deletedCount === 0) {
      res.status(404).json({ error: "Lesson not found" });
    } else {
      // Check if the lessonThumbnail exists
      if (lesson.lessonThumbnail) {
        // Delete the associated thumbnail file from Cloudinary
        await cloudinary.uploader.destroy(lesson.public_id_thumbnail);
      }

      // Check if the lessonVideo exists
      if (lesson.lessonVideo) {
        // Delete the associated video file from Cloudinary
        await cloudinary.uploader.destroy(lesson.public_id_video);
      }

      res.status(204).send();
    }
  } catch (error) {
    console.error("Error during Lesson deletion:", error);
    res.status(500).json({ error: "Lesson deletion failed" });
  }
});

// Route to get all Lessons for a specific Yunit
router.get("/lessons/:yunitId", async (req, res) => {
  try {
    const { yunitId } = req.params;

    const lessons = await Lesson.findAll({
      where: { yunitId },
      attributes: [
        "lessonId",
        "lessonTitle",
        "lessonNumber",
        "lessonName",
        "lessonThumbnail",
        "lessonVideo",
      ],
      order: [["lessonTitle", "ASC"]],
    });

    res.json(lessons);
  } catch (error) {
    console.error("Error getting Lessons for Yunit:", error);
    res.status(500).json({ error: "Failed to get Lessons" });
  }
});

module.exports = router;
