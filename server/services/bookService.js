import Book from "../models/book";
import BaseService from "./baseService";
class BookService extends BaseService {
  constructor() {
    super();
    this.className = Book;
  }
  async create(params) {
    let newBook = new Book();
    newBook.name = params.name;
    newBook.image = params.image;
    newBook.author = params.author;
    newBook.pages = params.pages;
    newBook.price = params.price;
    newBook.createdAt = Date.now();
    let bookError = newBook.validateSync();
    if (!bookError) {
      try {
        let resp = await newBook.save();
        return {
          status: true,
          massage: "Book Added Successfully!",
          data: resp,
        };
      } catch (e) {
        if (e.name == "ValidationError") {
          return {
            status: false,
            errors: e.errors[Object.keys(e.errors)[0]].properties,
          };
        } else {
          return {
            status: false,
            errors: ["unable to save to database."],
          };
        }
      }
    } else {
      let errArr = [];
      for (var err in bookError.errors) {
        errArr.push(bookError.errors[err].message);
      }
      return {
        status: false,
        errors: errArr,
      };
    }
  }
}

export default BookService;
