"use strict";

var express = require("express");
var cors = require("cors");
var dotenv = require("dotenv");
var bodyParser = require("body-parser");
var sequelize = require("./config/sequelize");
var authRouter = require("./routes/authRoutes");
var userRouter = require("./routes/userRoutes");
var sectionsRouter = require("./routes/sectionRoutes");
var studentsRouter = require("./routes/studentRoutes");
var sprofileRouter = require("./routes/sprofileRoutes");
var unitsRouter = require("./routes/unitRoutes");
var lessonsRouter = require("./routes/lessonRoutes");
var exercisesRouter = require("./routes/exerciseRoutes");
var questionsRouter = require("./routes/questionRoutes");

// Load environment variables from a .env file
dotenv.config();

// Create an Express application
var app = express();
var PORT = process.env.PORT || 3001;

// Set up CORS options
// const corsOptions = {
//   origin: [
//     "https://mathsaya4kids.vercel.app",
//     "https://mathsaya4kids.netlify.app",
//   ],
//   methods: "GET,PUT,POST,DELETE",
//   credentials: true,
//   optionsSuccessStatus: 204,
// };

// Enable CORS with specified options
// app.use(cors(corsOptions));
app.use(cors());

// Handle preflight requests
// app.options("*", (req, res) => {
//   console.log("Handling preflight request");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.status(200).send();
// });

app.use(bodyParser.json());

// Set up routes for various API endpoints
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/sections", sectionsRouter);
app.use("/students", studentsRouter);
app.use("/sprofile", sprofileRouter);
app.use("/units", unitsRouter);
app.use("/lessons", lessonsRouter);
app.use("/exercises", exercisesRouter);
app.use("/questions", questionsRouter);

// Start the Express server
app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT));
  sequelize.sync({
    alter: false
  }) // Use { force: true } or { alter: true } during development to drop and recreate tables
  .then(function () {
    console.log("Connected to the database");
  })["catch"](function (error) {
    console.error("Unable to connect to the database:", error);
  });
});