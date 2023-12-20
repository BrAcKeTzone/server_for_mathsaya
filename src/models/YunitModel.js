const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const Teacher = require("./TeacherModel");
const { v4: uuidv4 } = require("uuid");

const Yunit = sequelize.define("Yunit", {
  yunitId: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  },
  yunitNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  yunitName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  yunitThumbnail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  public_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  teacherId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Yunit.belongsTo(Teacher, {
  foreignKey: "teacherId",
  onDelete: "CASCADE",
});

module.exports = Yunit;
