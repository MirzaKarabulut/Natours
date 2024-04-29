const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXPECTİON  💣 Shutting down... ");
  console.log(err.name, err.message);
  // gracefully shut down
  process.exit(1);
});

dotenv.config({
  path: "./config.env",
});
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB connections successful");
  });

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}..`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTİON 💣 Shutting down... ");
  console.log(err.name, err.message);
  // gracefully shut down
  server.close(() => {
    process.exit(1);
  });
});
