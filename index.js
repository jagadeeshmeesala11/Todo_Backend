const express = require("express");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const { AppDataSource } = require("./connection");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization", error);
  });

app.use("/tasks", taskRoutes);
