const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const Student = require("./StudentModel");

const Sprofile = sequelize.define("Sprofile", {
  profileId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  firstLoginDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  loginDates: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  studentId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  teacherId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

Sprofile.belongsTo(Student, {
  foreignKey: "studentId",
  onDelete: "CASCADE",
});

module.exports = Sprofile;
