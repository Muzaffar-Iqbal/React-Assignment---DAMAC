import React, { Component } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
  styled,
  Paper,
  Typography,
  Avatar,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { getBaseUrl } from "../../generalUtility";
import { getAllBooks, deleteBook } from "./action";
import { Link } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StyledTable = styled(Table)`
  & > tr {
    height: 40px !important;
  }

  & > th {
    max-width: 125px;
    min-width: 125px;
    padding: 0 !important;
    overflow-x: auto;
    white-space: nowrap;
    text-align: center !important;
  }

  & > td {
    height: 40px !important;
    padding: 5px !important;
    text-align: center !important;
  }
`;
const TableContainer = styled(Paper)`
  width: 90%;
  margin: 50px 0 0 50px;
  overflow-x: auto;
  margin-right: auto;
  margin-left: auto;
  padding: 10px;
`;
const THead = styled(TableRow)`
  & > th {
    font-size: 20px;
    background: #000000;
    color: #ffffff;
  }
`;

const TRow = styled(TableRow)`
  & > td {
    font-size: 18px;
  }
`;

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showAlert: false,
      alertType: "",
      alertMassage: "",
    };
  }
  async componentDidMount() {
    let result = await getAllBooks();
    if (result.status) {
      this.setState({ books: result.data });
    }
  }
  deleteBookData = async (id) => {
    let { books } = this.state;
    let result = await deleteBook(id);
    if (result.status) {
      let index = books.findIndex((u) => u._id == id);
      books.splice(index, 1);
      this.setState({
        books: [...books],
        showAlert: true,
        alertMassage: "Deleted successfully!",
        alertType: "success",
      });
    }
  };
  handleCloseAlert = () => {
    this.setState({ showAlert: false, alertType: "", alertMassage: "" });
  };
  render() {
    let { books, showAlert, alertMassage, alertType } = this.state;
    return (
      <>
        <TableContainer className="container">
          <Typography variant="h4">ALL BOOKS</Typography>
          <StyledTable>
            <TableHead>
              <THead>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Pages</TableCell>
                <TableCell>Price</TableCell>
                <TableCell></TableCell>
              </THead>
            </TableHead>
            <TableBody>
              {books.map((book) => (
                <TRow key={book._id}>
                  <TableCell>
                    <Avatar
                      alt={book.name}
                      src={getBaseUrl() + book.image}
                      sx={{ width: 56, height: 56 }}
                      variant="square"
                    />
                  </TableCell>
                  <TableCell>{book.name}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.pages}</TableCell>
                  <TableCell>{book.price}</TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      variant="contained"
                      style={{ marginRight: 10 }}
                      component={Link}
                      to={`/bookEditor/${book._id}`}
                    >
                      Edit
                    </Button>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => this.deleteBookData(book._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TRow>
              ))}
            </TableBody>
          </StyledTable>
        </TableContainer>
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
      </>
    );
  }
}
