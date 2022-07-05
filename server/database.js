import mongoose from "mongoose";

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || "27017";
const DB_NAME = process.env.DB_NAME || "Damac";
const DB_USER = process.env.DB_USER || "";
const DB_PASS = process.env.DB_PASS || "";

const setConnection = () => {
  let connectionUri = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
  if (DB_USER !== "" && DB_PASS !== "") {
    connectionUri = `mongodb://${DB_USER}:${encodeURIComponent(
      DB_PASS
    )}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
  }
  mongoose.connect(connectionUri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const database = {
  setConnection: setConnection,
};

export default database;
