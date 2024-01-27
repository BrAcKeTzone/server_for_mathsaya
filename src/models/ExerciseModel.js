const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const Lesson = require("./LessonModel");
const { v4: uuidv4 } = require("uuid");

const Exercise = sequelize.define("Exercise", {
  exerciseId: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  },
  exerciseNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  exerciseName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  exerciseDescription: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lessonId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Exercise.belongsTo(Lesson, {
  foreignKey: "lessonId",
  onDelete: "CASCADE",
});

module.exports = Exercise;
