const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/sequelize");

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const sectionsRouter = require("./routes/sectionRoutes");
const studentsRouter = require("./routes/studentRoutes");
const sprofileRouter = require("./routes/sprofileRoutes");
const unitsRouter = require("./routes/unitRoutes");
const lessonsRouter = require("./routes/lessonRoutes");
const exercisesRouter = require("./routes/exerciseRoutes");
const questionsRouter = require("./routes/questionRoutes");

// Load environment variables
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
const corsOptions = {
  origin: [
    /https:\/\/mathsaya4kids\.vercel\.app($|\/.*)/,
    /https:\/\/mathsaya4kids\.onrender\.com($|\/.*)/,
    /https:\/\/www\.mathsaya4kids\.site($|\/.*)/,
    /https:\/\/app\.mathsaya4kids\.site($|\/.*)/,
  ],
  methods: "GET,PUT,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

// app.use(cors());

// app.options("*", cors());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Body parser middleware
app.use(bodyParser.json());

// Routes
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/sections", sectionsRouter);
app.use("/students", studentsRouter);
app.use("/sprofile", sprofileRouter);
app.use("/units", unitsRouter);
app.use("/lessons", lessonsRouter);
app.use("/exercises", exercisesRouter);
app.use("/questions", questionsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  sequelize
    .sync({ alter: false }) // Use { force: true } or { alter: true } during development to drop and recreate tables
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
    });
});
