const Exercise = require("../../models/ExerciseModel");

async function addExercise(req, res) {
  try {
    const {
      exerciseNumber,
      exerciseName,
      exerciseDescription,
      lessonId,
      userId,
    } = req.body;

    // Check if an Exercise with the same exerciseNumber and userId already exists
    const existingExercise = await Exercise.findOne({
      where: { exerciseNumber, userId, lessonId },
    });

    if (existingExercise) {
      return res.status(400).json({
        error: "Exercise with the same number and teacher already exists",
      });
    }

    const newExercise = await Exercise.create({
      exerciseNumber,
      exerciseName,
      exerciseDescription,
      lessonId,
      userId,
    });

    res.status(201).json(newExercise);
  } catch (error) {
    console.error("Error during Exercise addition:", error);
    res.status(500).json({ error: "Exercise addition failed" });
  }
}

async function editExercise(req, res) {
  try {
    const { exerciseId } = req.params;
    const updatedData = req.body;

    const exercise = await Exercise.findByPk(exerciseId);

    if (!exercise) {
      res.status(404).json({ error: "Exercise not found" });
      return;
    }

    await exercise.update(updatedData);

    res.json(exercise);
  } catch (error) {
    console.error("Error during Exercise edit:", error);
    res.status(500).json({ error: "Exercise edit failed" });
  }
}

async function viewExercise(req, res) {
  try {
    const { exerciseId } = req.params;

    const exercise = await Exercise.findByPk(exerciseId);

    if (!exercise) {
      res.status(404).json({ error: "Exercise not found" });
    } else {
      res.json(exercise);
    }
  } catch (error) {
    console.error("Error during Exercise view:", error);
    res.status(500).json({ error: "Exercise retrieval failed" });
  }
}

async function deleteExercise(req, res) {
  try {
    const { exerciseId } = req.params;

    const deletedCount = await Exercise.destroy({ where: { exerciseId } });

    if (deletedCount === 0) {
      res.status(404).json({ error: "Exercise not found" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.error("Error during Exercise deletion:", error);
    res.status(500).json({ error: "Exercise deletion failed" });
  }
}

async function getExercisesByLesson(req, res) {
  try {
    const { lessonId } = req.params;

    const exercises = await Exercise.findAll({
      where: { lessonId },
      order: [["exerciseNumber", "ASC"]],
    });

    res.json(exercises);
  } catch (error) {
    console.error("Error getting exercises for a lesson:", error);
    res.status(500).json({ error: "Failed to get exercises" });
  }
}

module.exports = {
  addExercise,
  viewExercise,
  editExercise,
  deleteExercise,
  getExercisesByLesson,
};
