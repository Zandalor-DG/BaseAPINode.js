const express = require("express");
const bodyParser = require("body-parser");
const accountRouter = require("./routes/accountRouter");
const userRouter = require("./routes/userRouter");
const cors = require("cors");

const app = express();

const http = require("http");
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));
app.use("/auth", accountRouter);
app.use("/user", userRouter);

server.listen(4000, () => console.log("server started"));
