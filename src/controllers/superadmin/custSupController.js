const EmailToAdmin = require("../../models/EmailToAdminModel");

async function getTotalEmails(req, res) {
  try {
    const totalEmails = await EmailToAdmin.count();
    res.json({ totalEmails });
  } catch (error) {
    console.error("Error during fetching total number of emails:", error);
    res.status(500).json({ error: "Fetching total emails count failed" });
  }
}

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

async function listUnreadEmailEntries(req, res) {
  try {
    const unreadEmailEntries = await EmailToAdmin.findAll({
      where: { status: false },
      attributes: ["emailId", "teacherEmail", "subject", "createdAt", "status"],
      order: [["createdAt", "DESC"]],
    });

    res.json({ emailEntries: unreadEmailEntries });
  } catch (error) {
    console.error("Error while fetching unread email entries:", error);
    res.status(500).json({ error: "Failed to fetch unread email entries" });
  }
}

async function listReadEmailEntries(req, res) {
  try {
    const readEmailEntries = await EmailToAdmin.findAll({
      where: { status: true },
      attributes: ["emailId", "teacherEmail", "subject", "createdAt", "status"],
      order: [["createdAt", "DESC"]],
    });

    res.json({ emailEntries: readEmailEntries });
  } catch (error) {
    console.error("Error while fetching read email entries:", error);
    res.status(500).json({ error: "Failed to fetch read email entries" });
  }
}

module.exports = {
  getTotalEmails,
  listEmailEntries,
  viewEmailEntry,
  listUnreadEmailEntries,
  listReadEmailEntries,
};
