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
  lessonNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  lessonName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lessonDescription: {
    type: DataTypes.TEXT,
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
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Lesson.belongsTo(Yunit, {
  foreignKey: "yunitId",
  onDelete: "CASCADE",
});

module.exports = Lesson;
