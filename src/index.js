const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const sequelize = require("./config/sequelize");

const superadminRouter = require("./routes/superadmin");
const teachersRouter = require("./routes/teachers");
const sectionsRouter = require("./routes/sections");
const studentsRouter = require("./routes/students");
const sprofileRouter = require("./routes/sprofiles");
const dashboardRouter = require("./routes/dashboard");
const yunitsRouter = require("./routes/yunits");
const lessonsRouter = require("./routes/lessons");
const exercisesRouter = require("./routes/exercises");
const questionsRouter = require("./routes/questions");

// Load environment variables from a .env file
dotenv.config();

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3001;

// Set up CORS options
const corsOptions = {
  origin: ["https://mathsaya4kids.vercel.app"],
  methods: "GET,PUT,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

// Enable CORS with specified options
app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", (req, res) => {
  console.log("Handling preflight request");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  res.status(200).send();
});

app.use(bodyParser.json());

// Set up routes for various API endpoints
app.use("/superadmin", superadminRouter);
app.use("/teachers", teachersRouter);
app.use("/sections", sectionsRouter);
app.use("/students", studentsRouter);
app.use("/sprofile", sprofileRouter);
app.use("/dashboard", dashboardRouter);
app.use("/yunits", yunitsRouter);
app.use("/lessons", lessonsRouter);
app.use("/exercises", exercisesRouter);
app.use("/questions", questionsRouter);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  sequelize
    .sync({ force: false }) // Use { force: true } during development to drop and recreate tables
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
    });
});
