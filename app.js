const express = require("express");
const app = express();
const cors = require("cors");
const config = require("config");
const books = require("./routes/books");
const auth = require("./routes/auth");

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
if (!config.get("jwtPrivateKey")) {
  console.log(
    "FATAL ERROR: jwtPrivatekey not defined in environmental variable "
  );
  process.exit(1);
}

app.use("/api/books", books);
app.use("/api/authors", authors);
app.use("/api/auth", auth);

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}..`)
);
module.exports = server;
