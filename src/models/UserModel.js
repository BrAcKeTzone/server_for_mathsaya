const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const { v4: uuidv4 } = require("uuid");

const User = sequelize.define("User", {
  userId: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "First name cannot be null" },
      notEmpty: { msg: "First name cannot be empty" },
    },
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Last name cannot be null" },
      notEmpty: { msg: "Last name cannot be empty" },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  schoolName: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [0, 100],
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Password cannot be null" },
      notEmpty: { msg: "Password name cannot be empty" },
    },
  },
  gender: {
    type: DataTypes.ENUM("Male", "Female", "Non-binary"),
    allowNull: false,
  },
  roleType: {
    type: DataTypes.ENUM("Teacher", "Admin"),
    allowNull: false,
  },
});

module.exports = User;
