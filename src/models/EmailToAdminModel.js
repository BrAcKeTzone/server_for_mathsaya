const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("../models/UserModel");
const { v4: uuidv4 } = require("uuid");

const EmailToAdmin = sequelize.define("EmailToAdmin", {
  emailId: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  },
  teacherEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  attachment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  public_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

EmailToAdmin.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

module.exports = EmailToAdmin;
