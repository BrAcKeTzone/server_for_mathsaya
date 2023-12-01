const express = require("express");
const router = express.Router();
const Lesson = require("../models/LessonModel");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Define storage for uploaded files and ensure the 'uploads/lessons' directory exists.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads/lessons");
    fs.mkdirSync(uploadDir, { recursive: true }); // Create directory if it doesn't exist
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename, e.g., using Date.now()
    const uniqueFileName = Date.now() + "-" + file.originalname;
    cb(null, uniqueFileName);
  },
});
const upload = multer({ storage: storage });

router.post("/add", upload.single("lessonThumbnail"), async (req, res) => {
  try {
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
      newLessonData.lessonThumbnail = req.file.filename;
    }

    const newLesson = await Lesson.create(newLessonData);
    res.status(201).json(newLesson);
  } catch (error) {
    console.error("Error during Lesson addition:", error);
    res.status(500).json({ error: "Lesson addition failed" });
  }
});

// Route for adding a lessonVideo to an existing lesson entry
router.post(
  "/addVideo/:lessonId",
  upload.single("lessonVideo"),
  async (req, res) => {
    try {
      const { lessonId } = req.params;
      const lesson = await Lesson.findByPk(lessonId);

      if (!lesson) {
        return res.status(404).json({ error: "Lesson not found" });
      }

      // Handle uploaded video file
      if (req.file) {
        // Optionally, you can delete the existing video file, if it exists
        // Example: fs.unlinkSync(path.join(__dirname, "../uploads/lessons", lesson.lessonVideo));

        lesson.lessonVideo = req.file.filename;
        await lesson.save();
        res.json(lesson);
      } else {
        res.status(400).json({ error: "No video file provided" });
      }
    } catch (error) {
      console.error("Error during Lesson video addition:", error);
      res.status(500).json({ error: "Lesson video addition failed" });
    }
  }
);

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
        // Delete the old image file, if it exists
        if (lesson.lessonThumbnail) {
          const oldImageFilePath = path.join(
            __dirname,
            "../uploads/lessons",
            lesson.lessonThumbnail
          );
          fs.unlinkSync(oldImageFilePath);
        }
        updatedData.lessonThumbnail = req.file.filename;
      }

      await lesson.update(updatedData);
      res.json(lesson);
    } catch (error) {
      console.error("Error during Lesson edit:", error);
      res.status(500).json({ error: "Lesson edit failed" });
    }
  }
);

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
        const thumbnailPath = path.join(
          __dirname,
          "../uploads/lessons",
          lesson.lessonThumbnail
        );

        // Delete the associated thumbnail file
        fs.unlinkSync(thumbnailPath);
      }

      // Check if the lessonVideo exists
      if (lesson.lessonVideo) {
        const videoPath = path.join(
          __dirname,
          "../uploads/lessons",
          lesson.lessonVideo
        );

        // Delete the associated video file
        fs.unlinkSync(videoPath);
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
      order: [["lessonTitle", "ASC"]],
    });
    res.json(lessons);
  } catch (error) {
    console.error("Error getting Lessons for Yunit:", error);
    res.status(500).json({ error: "Failed to get Lessons" });
  }
});

module.exports = router;
