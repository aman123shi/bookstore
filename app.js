const express = require("express");
const app = express();
const cors = require("cors");
const config = require("config");
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

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}..`)
);
module.exports = server;
