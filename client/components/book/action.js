import { getAPIUrl } from "../../generalUtility";
import axios from "axios";

export const getAllBooks = () => {
  return axios
    .get(getAPIUrl() + "book/all")
    .then(function (response) {
      if (!response.data.error) {
        return { status: true, data: response.data.data };
      } else {
        return { status: false, errors: response.data.msg };
      }
    })
    .catch(function (error) {
      return {
        status: false,
        errors: "Unknown error occurred while getting all books.",
      };
    });
};
export const deleteBook = (book) => {
  return axios
    .delete(getAPIUrl() + "book/" + book)
    .then(function (response) {
      if (!response.data.error) {
        return { status: true, data: response.data.data };
      } else {
        return { status: false, errors: response.data.msg };
      }
    })
    .catch(function (error) {
      return {
        status: false,
        errors: "Unknown error occurred while delete book.",
      };
    });
};
