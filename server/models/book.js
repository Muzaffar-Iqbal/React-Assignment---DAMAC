import mongoose from "mongoose";

let bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Book name is required!"],
      trim: true,
    },
    image: {
      type: String,
    },
    author: {
      type: String,
      required: [true, "Book author name is required!"],
    },
    pages: {
      type: String,
      required: [true, "Book's number of pages is required!"],
    },
    price: {
      type: String,
      required: [true, "Book price is required!"],
    },
    createdAt: {
      type: Date,
      immutable: true,
    },
  },
  { versionKey: false, timestamps: true }
);
export default mongoose.model("Book", bookSchema);
