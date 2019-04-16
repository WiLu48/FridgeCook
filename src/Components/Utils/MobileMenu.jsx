import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withStyles, Button, Menu, MenuItem, ClickAwayListener } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SimpleMenu from './SimpleMenu';
import { AuthContext } from '../Auth/Auth';



const styles = theme => ({
    menu: {
        top: '1px',
        pointerEvents: 'none',
    },
    links: {
        color: 'white',
        textDecoration: 'none',
    }
})

class MobileMenu extends Component {
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
      const {classes, isAuth} = this.props;
      const {logout} = this.context;
    return (
      <div style={{position: 'absolute', right: '5px'}}>
          <Button 
          aria-owns={this.state.open ? 'simple-menu' : null}
          aria-haspopup="menu"
          onClick={this.handleClick}
          ><MenuIcon style={{color: 'white'}} /></Button>
          <Menu
          id="mobile-menu"
          anchorEl={this.state.anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.open}
          className={classes.menu}
        >
            <ClickAwayListener onClickAway={this.handleRequestClose} >              
                <Link className={classes.links} to="/recipes"><MenuItem style={{pointerEvents: 'auto'}} >Recipes</MenuItem></Link>
                <Link className={classes.links} to="/about"><MenuItem style={{pointerEvents: 'auto'}} >About</MenuItem></Link>
                <Link className={classes.links} to="/shoppinglist"><MenuItem style={{pointerEvents: 'auto'}} >Shopping List</MenuItem></Link>
                {isAuth ? 
                <>
                <Link className={classes.links} to="/dashboard"><MenuItem style={{pointerEvents: 'auto'}} >My Account</MenuItem></Link>
                <MenuItem onClick={logout} style={{pointerEvents: 'auto'}} >Logout</MenuItem>
                </>
                : <Link className={classes.links} to="/login"><MenuItem style={{pointerEvents: 'auto'}} >Login</MenuItem></Link>
                }                
            </ClickAwayListener>
        </Menu>
        
      </div>
    )
  }
}

export default withStyles(styles)(MobileMenu);
