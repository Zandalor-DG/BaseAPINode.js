const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

let corsOptions = {
  origin: "http://localhost:5051",
};

app.use(cors(corsOptions));

// app.use(bodyParser.json);

app.use(bodyParser.urlencoded({ extended: true }));

//********************************************************** */

const db = require("./app/models");
const { initial } = require("lodash");
const Role = db.role;

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Db");
  initial();
});

//********************************************************** */
function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}
//********************************************************* */
app.get("/", (req, res) => {
  res.json({ message: "welcome" });
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});