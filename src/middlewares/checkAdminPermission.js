const User = require("../models/UserModel");

async function checkAdminPermission(userId, res) {
  try {
    if (!userId) {
      return res
        .status(400)
        .json({ error: "UserId is required in the request body" });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.roleType !== "Admin") {
      return res.status(403).json({ error: "No permission" });
    }

    return true;
  } catch (error) {
    console.error("Error during admin permission check:", error);
    res.status(500).json({ error: "Admin permission check failed" });
    return false;
  }
}
exports.checkAdminPermission = checkAdminPermission;
