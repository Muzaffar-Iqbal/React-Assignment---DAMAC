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
import { signUp } from "./action";
import { getStarted } from "../login/action";
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
  signUp(data) {
    return dispatch(signUp(data));
  },
});

@connect(mapStateToProps, mapDispatchToProps)
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      showAlert: false,
      alertType: "",
      alertMassage: "",
    };
  }
  handleChangeInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  userSignUp = async () => {
    let { name, email, password, confirmPassword } = this.state;
    this.setState({
      buttonLoading: true,
    });
    this.props
      .signUp({ name, email, password, confirmPassword })
      .then((response) => {
        if (response.status) {
          setStorage("authToken", response.data.authToken);
          this.setState(
            {
              showAlert: true,
              alertMassage: "Registered successfully!",
              alertType: "success",
            },
            () => this.props.getStarted()
          );
        } else {
          this.setState({
            showAlert: true,
            alertMassage: response.errors,
            alertType: "error",
          });
          this.setState({
            buttonLoading: false,
          });
        }
      });
  };
  handleCloseAlert = () => {
    this.setState({ showAlert: false, alertType: "", alertMassage: "" });
  };
  render() {
    let {
      buttonLoading,
      name,
      email,
      password,
      confirmPassword,
      showAlert,
      alertMassage,
      alertType,
    } = this.state;
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
              Sign up
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={this.handleChangeInput}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={this.handleChangeInput}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={this.handleChangeInput}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={this.handleChangeInput}
                  />
                </Grid>
              </Grid>
              <LoadingButton
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={buttonLoading}
                onClick={this.userSignUp}
                loadingPosition="start"
              >
                Sign Up
              </LoadingButton>

              <Grid container>
                <Grid item>
                  <NavLink to="/login" variant="body2">
                    Already have an account? Sign in
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
