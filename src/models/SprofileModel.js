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
    type: DataTypes.STRING,
    allowNull: true,
  },
  studentId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Sprofile.belongsTo(Student, {
  foreignKey: "studentId",
  onDelete: "CASCADE",
});

module.exports = Sprofile;
