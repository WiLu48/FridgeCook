import React from 'react';
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, withStyles, Hidden, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
    toolbar: {
        justifyContent: 'space-around',

    }
})

function NavBar (props) {
    const {classes} = props;
    return(
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Hidden smUp>
                    <IconButton color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                </Hidden>
                <Hidden xsDown>
                    <Typography>
                        <Link to="/recipes">RECIPES</Link>
                    </Typography>
                    <Typography>
                        <Link to="/">EXPLORE</Link>
                    </Typography>
                    <Typography>
                        <Link to="/">FRIDGE COOK</Link>
                    </Typography>
                    <Typography>
                        <Link to="/">ABOUT</Link>
                    </Typography>
                    <Typography>
                        <Link to="/">LOGIN</Link>
                    </Typography>
                </Hidden>
            </Toolbar>
        </AppBar>
    )
};

export default withStyles(styles)(NavBar);