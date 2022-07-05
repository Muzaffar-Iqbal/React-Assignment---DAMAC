import { getAPIUrl } from "../../generalUtility";
import axios from "axios";

export const getBook = (book) => {
  return axios
    .get(getAPIUrl() + "book/" + book)
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
        errors: "Unknown error occurred while getting book.",
      };
    });
};
export const updateBook = (book) => {
  return axios
    .post(getAPIUrl() + "book", book)
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
        errors: "Unknown error occurred while update book.",
      };
    });
};
export const addNewBook = (book) => {
  return axios
    .put(getAPIUrl() + "book", book)
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
        errors:
          error?.response?.data?.data?.errors?.[0] ||
          "Unknown error occurred while add book.",
      };
    });
};
