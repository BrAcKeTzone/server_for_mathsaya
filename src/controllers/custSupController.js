const EmailToAdmin = require("../models/EmailToAdminModel");

async function listEmailEntries(req, res) {
  try {
    const emailEntries = await EmailToAdmin.findAll({
      attributes: ["emailId", "teacherEmail", "subject", "createdAt", "status"],
      order: [
        ["createdAt", "DESC"],
        ["status", "ASC"],
      ],
    });

    res.json({ emailEntries });
  } catch (error) {
    console.error("Error while fetching email entries:", error);
    res.status(500).json({ error: "Failed to fetch email entries" });
  }
}

async function viewEmailEntry(req, res) {
  try {
    const { emailId } = req.params;

    const emailEntry = await EmailToAdmin.findOne({
      where: { emailId },
      attributes: [
        "emailId",
        "teacherEmail",
        "subject",
        "content",
        "createdAt",
        "status",
        "attachment",
        "public_id",
      ],
    });

    if (!emailEntry) {
      return res.status(404).json({ error: "Email entry not found" });
    }

    if (!emailEntry.status) {
      await emailEntry.update({ status: true });
    }

    res.json({ emailEntry });
  } catch (error) {
    console.error("Error while viewing email entry:", error);
    res.status(500).json({ error: "Failed to view email entry" });
  }
}

module.exports = {
  listEmailEntries,
  viewEmailEntry,
};
