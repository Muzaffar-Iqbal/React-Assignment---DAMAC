require("@babel/register")({
  presets: [
    require.resolve("@babel/preset-env"),
    require.resolve("@babel/preset-react"),
  ],
  plugins: [
    [require.resolve("@babel/plugin-proposal-decorators"), { legacy: true }],
    [
      require.resolve("@babel/plugin-proposal-class-properties"),
      { loose: true },
    ],
    [
      require.resolve("@babel/plugin-proposal-private-methods"),
      { loose: true },
    ],
  ],
  ignore: [/node_modules/],
});
require("@babel/polyfill");

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { default: apiRoutes } = require("./routes/api");
const { default: clientRenderer } = require("./clientRender");
const { default: database } = require("./database");
const fileUpload = require("express-fileupload");
const { logger } = require("./helpers/utility");

const PORT = process.env.PORT || 3001;

const app = express();
app.use("/static", express.static(path.resolve(__dirname, "..", "build")));

app.use(
  "/images",
  express.static(path.resolve(__dirname, "..", "build/images"))
);
app.use("/css", express.static(path.resolve(__dirname, "..", "build/css")));
app.use("/fonts", express.static(path.resolve(__dirname, "..", "build/fonts")));
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

database.setConnection();

app.use(cookieParser("ASecR3t@"));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());

app.use("/api", apiRoutes);
app.use("/", clientRenderer);

app.listen(PORT, () => {
  logger(`App listening on port ${PORT}!`);
});
app.on("error", onError);

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;
  switch (error.code) {
    case "EACCES":
      logger(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      logger(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}
