import React, { Component } from "react";
import { Switch } from "react-router-dom";
import LoginLayoutRoute from "./loginLayoutRoute";
import ProtectedRoutes from "./protectedRoutes";
import CommonLayoutRoute from "./commonLayoutRoute";
import Login from "../components/login";
import SignUp from "../components/signUp";
import Book from "../components/book";
import BookEditor from "../components/bookEditor";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <LoginLayoutRoute exact path={"/"} component={Login} />
        <LoginLayoutRoute exact path={"/login"} component={Login} />
        <LoginLayoutRoute exact path={"/register"} component={SignUp} />
        <ProtectedRoutes>
          <CommonLayoutRoute exact path={"/book"} component={Book} />
          <CommonLayoutRoute
            exact
            path={"/bookEditor"}
            component={BookEditor}
          />
          <CommonLayoutRoute
            exact
            path={"/bookEditor/:book"}
            component={BookEditor}
          />
        </ProtectedRoutes>
      </Switch>
    );
  }
}

export default Routes;
