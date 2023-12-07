const Question = require("../models/QuestionModel");
const cloudinary = require("../config/cloudinaryConfig");

async function addQuestion(req, res) {
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
}

async function editQuestion(req, res) {
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

async function viewQuestion(req, res) {
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
}

async function deleteQuestion(req, res) {
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
      if (question.questionImage && question.public_id) {
        // Check if a thumbnail file is associated with the Yunit
        // Delete the associated thumbnail file from Cloudinary
        await cloudinary.uploader.destroy(question.public_id);
      }
      res.status(204).send();
    }
  } catch (error) {
    console.error("Error during Question deletion:", error);
    res.status(500).json({ error: "Question deletion failed" });
  }
}

async function getQuestionsByExercise(req, res) {
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
}

module.exports = {
  addQuestion,
  editQuestion,
  viewQuestion,
  deleteQuestion,
  getQuestionsByExercise,
};
