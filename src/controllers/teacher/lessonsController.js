const Lesson = require("../../models/LessonModel");
const cloudinary = require("../../config/cloudinaryConfig");

async function addLesson(req, res) {
  try {
    console.log("req.file:", req.file);

    const { lessonNumber, lessonName, lessonDescription, yunitId, teacherId } =
      req.body;

    const existingLesson = await Lesson.findOne({
      where: { lessonNumber, yunitId, teacherId },
    });

    if (existingLesson) {
      return res.status(400).json({
        error: "Lesson with the same number and teacher already exists",
      });
    }

    const newLessonData = {
      lessonNumber,
      lessonName,
      lessonDescription,
      yunitId,
      teacherId,
    };

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
}

async function uploadVid(req, res) {
  try {
    const { lessonId } = req.params;

    const lesson = await Lesson.findByPk(lessonId);
    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    if (req.file) {
      if (lesson.lessonVideo) {
        await cloudinary.uploader.destroy(lesson.public_id_video);
      }

      await lesson.update({
        lessonVideo: req.file.path,
        public_id_video: req.file.filename,
      });

      res.json({ message: "Video uploaded successfully" });
    } else {
      res.status(400).json({ error: "No video file provided" });
    }
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).json({ error: "Video upload failed" });
  }
}

async function editLesson(req, res) {
  try {
    const { lessonId } = req.params;
    const updatedData = req.body;

    const lesson = await Lesson.findByPk(lessonId);

    if (!lesson) {
      res.status(404).json({ error: "Lesson not found" });
      return;
    }

    if (req.file) {
      if (lesson.lessonThumbnail && lesson.public_id_thumbnail) {
        await cloudinary.uploader.destroy(lesson.public_id_thumbnail);
      }
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

async function viewLesson(req, res) {
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
}

async function deleteLesson(req, res) {
  try {
    const { lessonId } = req.params;
    const lesson = await Lesson.findByPk(lessonId);

    if (!lesson) {
      res.status(404).json({ error: "Lesson not found" });
      return;
    }

    const deletedCount = await Lesson.destroy({ where: { lessonId } });

    if (deletedCount === 0) {
      res.status(404).json({ error: "Lesson not found" });
    } else {
      if (lesson.lessonThumbnail) {
        await cloudinary.uploader.destroy(lesson.public_id_thumbnail);
      }

      if (lesson.lessonVideo) {
        await cloudinary.uploader.destroy(lesson.public_id_video);
      }

      res.status(204).send();
    }
  } catch (error) {
    console.error("Error during Lesson deletion:", error);
    res.status(500).json({ error: "Lesson deletion failed" });
  }
}

async function getLessonsByYunit(req, res) {
  try {
    const { yunitId } = req.params;

    const lessons = await Lesson.findAll({
      where: { yunitId },
      order: [["lessonNumber", "ASC"]],
    });

    res.json(lessons);
  } catch (error) {
    console.error("Error getting Lessons for Yunit:", error);
    res.status(500).json({ error: "Failed to get Lessons" });
  }
}

module.exports = {
  addLesson,
  uploadVid,
  editLesson,
  viewLesson,
  deleteLesson,
  getLessonsByYunit,
};
