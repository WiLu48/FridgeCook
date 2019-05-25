
import React from 'react';
import { withStyles, Button, Menu, MenuItem, Typography } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Link } from 'react-router-dom'
import { AuthContext } from '../Auth/Auth';


const styles = theme => ({
    links: {
      color: 'black',
      fontWeight: 'bold',
      textDecoration: 'none',
      "&:hover": {
          color: '#B23554',
      }
    },
    menu: {
        top: '5px',
        pointerEvents: 'none',
    },
    paper: {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
})

class SimpleMenu extends React.Component {
static contextType = AuthContext;
  state = {
    anchorEl: null,
    open: false,
    event: 'none',
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
        >
          <Typography variant="h6">
            <Link className={classes.links} to='/dashboard'>
            My Account
            </Link>
          </Typography>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.open}
          className={classes.menu}
          onMouseLeave={this.handleRequestClose}
          classes={{
            paper: classes.paper
          }}
        >
            <ClickAwayListener onClickAway={this.handleRequestClose}>
                <MenuItem style={{pointerEvents: 'auto'}} onClick={logout}><Typography variant="h6" className={classes.links}>Sign Out</Typography></MenuItem>
            </ClickAwayListener>
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(SimpleMenu);