const express = require("express");
const router = express.Router();
const Question = require("../models/QuestionModel");
const sequelize = require("../config/sequelize");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cloudinary = require("../config/cloudinaryConfig");

// Define storage for uploaded files using Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "mathsaya_uploads/questions",
    public_id: (req, file) => {
      return `lesson_${Date.now()}`;
    },
  },
  allowedFormats: ["jpg", "jpeg", "png"], // Specify allowed formats
  timeout: 60000, // in milliseconds
});
const upload = multer({ storage: storage });

// Route for adding a new Question
router.post("/add", upload.single("questionImage"), async (req, res) => {
  try {
    console.log("req.file:", req.file); // Add this line to log req.file

    const { question_text, answer_choices, correct_answer, exerciseId } =
      req.body;

    const newQuestionData = {
      question_text,
      answer_choices,
      correct_answer,
      exerciseId,
    };

    // Check if an image file was uploaded
    if (req.file) {
      newQuestionData.questionImage = req.file.path;
      newQuestionData.public_id = req.file.filename;
    }

    const newQuestion = await Question.create(newQuestionData);

    res.status(201).json(newQuestion);
  } catch (error) {
    console.error("Error during Question addition:", error);
    res.status(500).json({ error: "Question addition failed" });
  }
});

// Route for viewing a Question by ID
router.get("/view/:questionId", async (req, res) => {
  try {
    const { questionId } = req.params;

    const question = await Question.findByPk(questionId);

    if (!question) {
      res.status(404).json({ error: "Question not found" });
    } else {
      res.json(question);
    }
  } catch (error) {
    console.error("Error during Question view:", error);
    res.status(500).json({ error: "Question retrieval failed" });
  }
});

// Route for editing (updating) a Question by ID
router.put(
  "/edit/:questionId",
  upload.single("questionImage"),
  async (req, res) => {
    try {
      const { questionId } = req.params;
      const updatedData = req.body;

      const question = await Question.findByPk(questionId);

      if (!question) {
        res.status(404).json({ error: "Question not found" });
        return;
      }

      // Handle uploaded files (image only)
      if (req.file) {
        if (question.questionImage && question.public_id) {
          await cloudinary.uploader.destroy(question.public_id);
        }
        // Set the questionImage field to the Cloudinary URL
        updatedData.questionImage = req.file.path;
        updatedData.public_id = req.file.filename;
      }

      await question.update(updatedData);

      res.json(question);
    } catch (error) {
      console.error("Error during Question edit:", error);
      res.status(500).json({ error: "Question edit failed" });
    }
  }
);

// Route for deleting a Question by ID
router.delete("/delete/:questionId", async (req, res) => {
  try {
    const { questionId } = req.params;

    const question = await Question.findByPk(questionId);

    if (!question) {
      res.status(404).json({ error: "Question not found" });
      return;
    }

    // Attempt to delete the question from the database
    const deletedCount = await Question.destroy({ where: { questionId } });

    if (deletedCount === 0) {
      res.status(404).json({ error: "Question not found" });
    } else {
      // Check if the questionImage exists
      if (question.questionImage) {
        const imagePath = path.join(
          __dirname,
          "../uploads/questions",
          question.questionImage
        );

        // Delete the associated image file
        fs.unlinkSync(imagePath);
      }

      res.status(204).send();
    }
  } catch (error) {
    console.error("Error during Question deletion:", error);
    res.status(500).json({ error: "Question deletion failed" });
  }
});

// Route for getting all questions for a specific exercise
router.get("/questions/:exerciseId", async (req, res) => {
  try {
    const { exerciseId } = req.params;

    const questions = await Question.findAll({
      where: { exerciseId },
      order: sequelize.literal("RAND()"),
    });

    res.json(questions);
  } catch (error) {
    console.error("Error getting questions for an exercise:", error);
    res.status(500).json({ error: "Failed to get questions" });
  }
});

module.exports = router;
