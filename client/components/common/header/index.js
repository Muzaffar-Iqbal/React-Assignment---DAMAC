import React from "react";
import { AppBar, Toolbar, styled, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "./actions";
import { removeUser } from "../../../generalUtility";

const HeaderContainer = styled(AppBar)`
  background: #111111;
`;

const Tabs = styled(NavLink)`
  color: #ffffff;
  margin-right: 20px;
  text-decoration: none;
  font-size: 20px;
`;

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  logout() {
    return dispatch(logout());
  },
});

@connect(mapStateToProps, mapDispatchToProps)
class Header extends React.Component {
  logout = () => {
    this.props.logout().then((response) => {
      if (response.status) {
        removeUser();
      }
    });
  };
  render() {
    return (
      <HeaderContainer position="static">
        <Toolbar>
          <Typography type="title" color="inherit" style={{ flex: 1 }}>
            {this.props.user.name}
          </Typography>
          <Tabs to="/bookEditor" exact>
            ADD BOOK
          </Tabs>
          <Button variant="contained" onClick={this.logout}>
            Logout
          </Button>
        </Toolbar>
      </HeaderContainer>
    );
  }
}

export default Header;
