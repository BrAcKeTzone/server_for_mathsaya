const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("./UserModel");

const RoomSection = sequelize.define("RoomSection", {
  sectionId: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  sectionName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  schoolYear: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalStudents: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

RoomSection.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

module.exports = RoomSection;
