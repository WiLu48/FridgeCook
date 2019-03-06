import React from 'react';
import { withStyles, Button, Menu, MenuItem, Popover } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Link } from 'react-router-dom'
import { AuthContext } from '../Auth/Auth';


const styles = theme => ({
    links: {
        color: 'white',
        textDecoration: 'none',
        "&:hover": {
            color: 'red',
        }
    },
    menu: {
        pointerEvents: 'none',
        top: '5px',
    }
})

class SimpleMenu extends React.Component {
static contextType = AuthContext;
  state = {
    anchorEl: null,
    open: false,
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
      const {logout} = this.context;
      const {classes} = this.props;
    return (
      <div>
        <Button
          aria-owns={this.state.open ? 'simple-menu' : null}
          aria-haspopup="menu"
          onMouseOver={this.handleClick}
          style={{pointerEvents: 'auto'}}
        >
            <Link className={classes.links} to='/dashboard'>
            My Account
            </Link>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.open}
          className={classes.menu}
          onMouseLeave={this.handleRequestClose}
          
        >
            <ClickAwayListener onClickAway={this.handleRequestClose}>
                <MenuItem onClick={logout}>Sign Out</MenuItem>
            </ClickAwayListener>
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(SimpleMenu);