import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  styled,
  Typography,
  Avatar,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { NavLink } from "react-router-dom";
import { getBaseUrl } from "../../generalUtility";
import { getBook, updateBook, addNewBook } from "./action";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px
`;
const Tabs = styled(NavLink)`
  color: #ffffff;
  margin-top: 20px;
  text-decoration: none;
  font-size: 20px;
  width: 100%;
  & > Button {
    width: 100%
`;
export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookId: this.props.match.params.book,
      name: "",
      image: "",
      author: "",
      pages: "",
      price: "",
      selectedImage: null,
      showAlert: false,
      alertType: "",
      alertMassage: "",
    };
  }
  async componentDidMount() {
    if (this.props.match.params.book) {
      let result = await getBook(this.props.match.params.book);
      if (result.status) {
        this.setState({
          name: result.data.name,
          image: result.data.image,
          author: result.data.author,
          pages: result.data.pages,
          price: result.data.price,
        });
      }
    }
  }
  addBook = async () => {
    let { name, image, author, pages, price, selectedImage } = this.state;

    let bookData = new FormData();
    bookData.append("name", name);
    if (selectedImage) bookData.append("image", selectedImage);
    else bookData.append("image", image);
    bookData.append("author", author);
    bookData.append("pages", pages);
    bookData.append("price", price);

    this.setState({ buttonLoading: true });
    if (this.props.match.params.book) {
      bookData.append("book", this.props.match.params.book);
      let result = await updateBook(bookData);
      if (result.status) {
        this.setState({
          showAlert: true,
          alertMassage: "Book updated successfully!",
          alertType: "success",
        });
      } else {
        this.setState({
          showAlert: true,
          alertMassage: result.errors,
          alertType: "error",
        });
      }
      this.setState({ buttonLoading: false });
    } else {
      let result = await addNewBook(bookData);
      if (result.status) {
        this.setState({
          showAlert: true,
          alertMassage: "Book added successfully!",
          alertType: "success",
          name: "",
          image: "",
          author: "",
          pages: "",
          price: "",
          selectedImage: null,
        });
      } else {
        this.setState({
          showAlert: true,
          alertMassage: result.errors,
          alertType: "error",
        });
      }
      this.setState({ buttonLoading: false });
    }
  };
  handleChangeInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleFileUploadError = (error) => {};

  handleFilesChange = (e) => {
    if (e.target.files[0]) {
      this.setState({
        selectedImage: e.target.files[0],
      });
    } else {
      this.setState({
        selectedImage: "",
      });
    }
  };
  handleCloseAlert = () => {
    this.setState({ showAlert: false, alertType: "", alertMassage: "" });
  };
  render() {
    let {
      name,
      image,
      author,
      pages,
      price,
      selectedImage,
      showAlert,
      alertMassage,
      alertType,
    } = this.state;
    return (
      <Container>
        <Typography variant="h4">Book Information</Typography>
        <FormControl>
          {/* <InputLabel htmlFor="my-input"> Image</InputLabel> */}
          <Avatar
            alt={name}
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : getBaseUrl() + image
            }
            sx={{ width: 80, height: 80 }}
            variant="square"
          />
          <Input onChange={this.handleFilesChange} name="image" type="file" />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">Name</InputLabel>
          <Input
            onChange={this.handleChangeInput}
            name="name"
            value={name}
            id="my-input"
            aria-describedby="my-helper-text"
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">Author</InputLabel>
          <Input
            onChange={this.handleChangeInput}
            name="author"
            value={author}
            id="my-input"
            aria-describedby="my-helper-text"
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">Pages</InputLabel>
          <Input
            onChange={this.handleChangeInput}
            name="pages"
            value={pages}
            id="my-input"
            aria-describedby="my-helper-text"
            type="number"
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">Price</InputLabel>
          <Input
            onChange={this.handleChangeInput}
            name="price"
            value={price}
            id="my-input"
            aria-describedby="my-helper-text"
            type="number"
          />
        </FormControl>
        <FormControl>
          <Button variant="contained" color="primary" onClick={this.addBook}>
            {this.props.match.params.book ? "Update Book" : "Add Book"}
          </Button>
          <Tabs to="/book">
            <Button variant="contained" color="primary">
              cancel
            </Button>
          </Tabs>
        </FormControl>
        {showAlert ? (
          <Snackbar
            open={showAlert}
            autoHideDuration={3000}
            onClose={this.handleCloseAlert}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert severity={alertType} onClose={this.handleCloseAlert}>
              {alertMassage}
            </Alert>
          </Snackbar>
        ) : (
          ""
        )}
      </Container>
    );
  }
}
