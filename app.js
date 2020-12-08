const express = require("express");
const bodyParser = require("body-parser");
const accountRouter = require("./routes/accountRouter");
const userRouter = require("./routes/userRouter");
const userId = require("./middleware/userId");
const cors = require("cors");

const app = express();

const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: "*",
    credentials: true,
  },
});
module.exports = io;

io.on("connection", (socket) => {
  console.log("New client connected" + socket.id);
  socket.on("bookCreated", (data) => {
    io.sockets.emit("newBook", { userId: data.userId });
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));
app.use("/", userId);
app.use("/auth", accountRouter);
app.use("/user", userRouter);

server.listen(4000, () => console.log("server started"));
