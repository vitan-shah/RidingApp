var envirornment = process.env.NODE_ENV || "development";
if (envirornment === "development") {
  require("dotenv").config();
}

//packages
const http = require("http");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary").v2;
const expressUpload = require("express-fileupload");
const socket = require("socket.io");
//swagger
const swaggerDoc = require("./app/config/swagger.config");
const swaggerUI = require("swagger-ui-express");

//routes
const userRoutes = require("./app/routes/user.routes");
const authRoutes = require("./app/routes/auth.routes");

const app = express();

//Server
const server = http.createServer(app);
//require socket
const io = socket(server, { cors: "*" });

//Database Connection
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DataBase Connected...");
  })
  .catch((err) => {
    console.log(err);
  });

//Configs
var corsOptions = {
 // origin: "https://tangerine-boba-abe4af.netlify.app",
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

//enable cors
app.use(cors(corsOptions));

app.use(function (req, res, next) {
  // res.setHeader(
  //   "Access-Control-Allow-Origin",
  //   "https://tangerine-boba-abe4af.netlify.app"
  // );
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://localhost:3000"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// parse requests of content-type - application/json
app.use(express.json({ limit: "50mb" }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

//Set File Limit
app.use(bodyParser.json({ limit: "50mb" }));
//parse cookies
app.use(cookieParser());

//public folder
app.use("/public", express.static(path.join(__dirname, "./app/public")));

//cloud store
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

//swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
//express upload
app.use(expressUpload());
//Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to SE project");
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Port Listening on ${PORT}`);
});

//Socket

io.on("connection", async (socket) => {
  console.log(`new connection ${socket.id}`);
  socket.on("join", async (data) => {
    if (data.type && data.type === "driver") {
      socket.join(data.city);
      socket.emit("res", { res: "successfully joined." });
    } else {
      socket.join(data.id);
    }
  });
  socket.on("find-ride", async (data) => {
    // console.log(data);
    let res = await socket.in(data.city).fetchSockets();
    if (res.length !== 0) socket.to(data.city).emit("select-ride", data);
    else
      io.to(socket.id).emit("no-ride", {
        msg: "no ride available.",
        id: data.id,
      });
  });

  socket.on("ride-selected", async (data) => {
    let res = await socket.in(data.user_id).fetchSockets();
    if (res.length < 2) {
      socket.join(data.user_id);
      socket.leave(data.location.split(",")[0]);
      io.to(data.user_id).emit("driver-selected", { ...data, status: "200" });
      io.to(data.location.split(",")[0]).emit("ride-cancelled", {
        msg: "can not able to select ride.",
      });
    } else {
      io.to(socket.id).emit("ride-cancelled", {
        msg: "can not able to select ride.",
      });
    }
  });
  socket.on("send-passenger-location", (location) => {
    io.to(location.id).emit("receive-passenger-location", {
      ...location,
    });
  });
  socket.on("end-ride", async (data) => {
    io.to(data.id).emit("ride-ended", { ...data });
  });
  socket.on("disconnect", () => {
    console.log("disconneted");
  });
});

module.exports = app;
