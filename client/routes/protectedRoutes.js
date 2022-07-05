import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

const mapStateToProps = state => ({
    is_logged_in: state.is_logged_in
});

@connect(mapStateToProps)
class ProtectedRoutes extends Component {
    render() {
        const { is_logged_in, children, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={matchProps =>
                    is_logged_in ? (
                        children
                    ) : (
                            <Redirect
                                to={{ pathname: "/login", state: { from: matchProps.location } }}
                            />
                        )
                }
            />
        );
    }
}

export default ProtectedRoutes;
