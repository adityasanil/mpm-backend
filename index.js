const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");
const app = express();
const registerUsers = require("./routes/registerUsers");
const login = require("./routes/login");
const users = require("./routes/users");
const search = require("./routes/searchRoute");
const cors = require("cors");

//Config
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

if (!config.get("mailAccountPassword")) {
  console.error(
    "FATAL ERROR: Mail password (mpm_mailPassword) is not defined."
  );
  process.exit(1);
}
// console.log("Applicatio name: " + config.get("name"));
// console.log("Mail server: " + config.get("mail.host"));
// console.log("Mail server password: " + config.get("mail.password"));

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useCreateIndex", true);

mongoose
  .connect(config.get("dbConnect"))
  .then(() => dbDebugger("Connected to MongoDB.."))
  .catch(err => dbDebugger("Could not connect to MongoDB: ", err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use("/registerUsers", registerUsers);
app.use("/login", login);
app.use("/users", users);
app.use("/search", search);

if (app.get("env") === "development") {
  startupDebugger("Morgan is enabled...");
  app.use(morgan("tiny"));
}

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
