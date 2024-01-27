const User = require("../models/UserModel");

async function checkTeacherPermission(userId, res) {
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

    if (user.roleType !== "Teacher") {
      return res.status(403).json({ error: "No permission" });
    }

    return true;
  } catch (error) {
    console.error("Error during teacher permission check:", error);
    res.status(500).json({ error: "Teacher permission check failed" });
    return false;
  }
}
exports.checkTeacherPermission = checkTeacherPermission;
