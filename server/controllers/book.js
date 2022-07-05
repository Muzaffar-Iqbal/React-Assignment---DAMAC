import BookService from "../services/bookService";
import { sendResponse, createFileName } from "../helpers/utility";

const getAllBooks = async (req, res) => {
  let bookService = new BookService();
  let allBooks = await bookService.get({});
  sendResponse(res, 200, allBooks, 0, 0);
};
const getBook = async (req, res) => {
  if (req.params.id) {
    let bookService = new BookService();
    let book = await bookService.getOne({
      _id: req.params.id,
    });
    sendResponse(res, 200, book, 0, 0);
  } else {
    sendResponse(res, 403, {}, 0, 1, "Invalid Request.");
  }
};
const addBook = async (req, res) => {
  let { name, author, pages, price } = req.body;
  let image;
  if (req.files) {
    image = req.files.image;
    let imageName = createFileName(image.name, image.mimetype);
    await image.mv(__dirname + "/../../uploads/images/" + imageName);
    image = "/uploads/images/" + imageName;
  } else {
    image = req.body.image;
  }
  let bookService = new BookService();
  let result = await bookService.create({
    name,
    image,
    author,
    pages,
    price,
  });
  if (result.status) {
    sendResponse(res, 200, result.data, 0, 0, "Book Added Successful.");
  } else {
    sendResponse(res, 403, result, 1, 0, "Some Error.");
  }
};
const updateBook = async (req, res) => {
  let { name, author, pages, price, book } = req.body;
  if (name && author && pages && price && book) {
    let image;
    if (req.files) {
      image = req.files.image;
      let imageName = createFileName(image.name, image.mimetype);
      await image.mv(__dirname + "/../../uploads/images/" + imageName);
      image = "/uploads/images/" + imageName;
    } else {
      image = req.body.image;
    }
    let bookService = new BookService();
    let result = await bookService.updateOne(
      { _id: book },
      {
        name,
        image,
        author,
        pages,
        price,
      }
    );
    if (result) {
      sendResponse(res, 200, result, 0, 0, "Updated Successful.");
    } else {
      sendResponse(res, 403, result, 1, 0, "Some Error.");
    }
  } else {
    sendResponse(res, 403, {}, 0, 1, "Invalid Request.");
  }
};
const removeBook = async (req, res) => {
  let { book } = req.params;
  if (book) {
    let bookService = new BookService();
    await bookService.delete({ _id: book });
    sendResponse(res, 200, {}, 0, 0, "Deleted Successful.");
  } else {
    sendResponse(res, 403, {}, 0, 1, "Invalid Request.");
  }
};
export default {
  getAllBooks,
  getBook,
  addBook,
  updateBook,
  removeBook,
};
