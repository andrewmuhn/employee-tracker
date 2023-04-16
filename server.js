const express = require("express");
const api = require("./routes");
const CLI = require("./lib");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", api);

app.use((err, req, res, next) => {
  console.error(err.stack);
  console.error(err.name);
  console.error(err.code);

  res.status(500).json({
    message: "Something went wrong",
  });
  res.status(404).json({
    message: "Not Found: Check your URL",
  });
  next();
});

app.listen(PORT, () => {
  console.log(`Server listening at https://localhost:${PORT}`);
  const cli = new CLI();
  // cli.asciHeader();
  cli.run();
});
