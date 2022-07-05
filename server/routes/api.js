import { Router } from "express";
import user from "../controllers/user";
import book from "../controllers/book";

const auth = require("../middleware/auth");
const userAuth = require("../middleware/userAuth");
const router = Router();

if (process.env.NODE_ENV === "development") {
  var cors = require("cors");
  router.use(
    cors({
      origin: "http://localhost:8080",
      credentials: true,
    })
  );
  router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
}

router.get("/user", userAuth);
router.post("/user/login", user.login);
router.post("/user/logout", user.logout);
router.post("/user/signup", user.signUp);
router.get("/user/detail", auth, user.getUser);

router.get("/book/all", auth, book.getAllBooks);
router.get("/book/:id", auth, book.getBook);
router.put("/book", auth, book.addBook);
router.post("/book", auth, book.updateBook);
router.delete("/book/:book", auth, book.removeBook);

export default router;
