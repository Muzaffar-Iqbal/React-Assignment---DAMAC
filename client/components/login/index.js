import React, { Component } from "react";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { login, getStarted } from "./action";
import { setStorage } from "../../generalUtility";

const theme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  getStarted() {
    dispatch(getStarted());
  },
  setLoginSession(data) {
    return dispatch(login(data));
  },
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
      email: "",
      password: "",
      showAlert: false,
      alertType: "",
      alertMassage: "",
    };
  }
  handleChangeInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  userLogin = async () => {
    let { email, password } = this.state;
    if (email && password) {
      this.setState({
        buttonLoading: true,
      });
      this.props.setLoginSession({ email, password }).then((response) => {
        if (response.status) {
          setStorage("authToken", response.data.authToken);
          this.setState(
            {
              showAlert: true,
              alertMassage: "Login successfully!",
              alertType: "success",
            },
            () => this.props.getStarted()
          );
        } else {
          this.setState({
            showAlert: true,
            alertMassage: response.errors,
            alertType: "error",
            buttonLoading: false,
          });
        }
      });
    } else {
      this.setState({
        showAlert: true,
        alertMassage: "All fields are required",
        alertType: "error",
      });
    }
  };
  handleCloseAlert = () => {
    this.setState({ showAlert: false, alertType: "", alertMassage: "" });
  };
  render() {
    let { buttonLoading, email, password, showAlert, alertMassage, alertType } =
      this.state;
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={this.handleChangeInput}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={this.handleChangeInput}
              />
              <LoadingButton
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={buttonLoading}
                onClick={this.userLogin}
                loadingPosition="start"
              >
                Sign In
              </LoadingButton>
              <Grid container>
                <Grid item>
                  <NavLink to="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
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
      </ThemeProvider>
    );
  }
}
