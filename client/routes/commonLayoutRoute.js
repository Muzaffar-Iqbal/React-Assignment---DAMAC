import React, { Component } from "react";
import { Route } from "react-router-dom";
import Layout from "../components/common";

export default class CommonLayoutRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={(matchProps) => (
          <Layout>
            <Component {...matchProps} />
          </Layout>
        )}
      />
    );
  }
}
