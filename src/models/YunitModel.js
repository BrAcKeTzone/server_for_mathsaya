const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("./UserModel");
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
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Yunit.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

module.exports = Yunit;
