import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  is_logged_in: state.is_logged_in,
});

@connect(mapStateToProps)
export default class LoginLayoutRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={(matchProps) =>
          !this.props.is_logged_in ? (
            <Route
              {...rest}
              render={(matchProps) => <Component {...matchProps} />}
            />
          ) : (
            <Redirect
              to={{
                pathname: "/book",
                state: { from: matchProps.location },
              }}
            />
          )
        }
      />
    );
  }
}
