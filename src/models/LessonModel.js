const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const Yunit = require("./YunitModel");
const { v4: uuidv4 } = require("uuid");

const Lesson = sequelize.define("Lesson", {
  lessonId: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  },
  lessonTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lessonNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  lessonName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lessonDescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lessonThumbnail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  public_id_thumbnail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lessonVideo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  public_id_video: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  yunitId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  teacherId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Lesson.belongsTo(Yunit, {
  foreignKey: "yunitId",
  onDelete: "CASCADE",
});

module.exports = Lesson;
