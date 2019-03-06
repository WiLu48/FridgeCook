import React from 'react';
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, withStyles, Hidden, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import { AuthConsumer } from '../Auth/Auth';
import SimpleMenu from '../Utils/SimpleMenu';

const styles = theme => ({
    toolbar: {
        justifyContent: 'space-around',
    },
    links: {
        color: 'white',
        textDecoration: 'none',
        "&:hover": {
            color: 'red',
        }
    },
})

function NavBar (props) {
    const {classes} = props;
    return(
        <AuthConsumer>
            {({ isAuth, logout }) => (
                <AppBar position="static">
                    <Toolbar className={classes.toolbar}>
                        <Hidden smUp>
                            <IconButton color="inherit" aria-label="Menu">
                                <MenuIcon />
                            </IconButton>
                        </Hidden>
                        <Hidden xsDown>
                            <Typography >
                                <Link className={classes.links} to="/recipes">RECIPES</Link>
                            </Typography>
                            <Typography>
                                <Link className={classes.links} to="/dashboard">EXPLORE</Link>
                            </Typography>
                            <Typography>
                                <Link className={classes.links} to="/">FRIDGE COOK</Link>
                            </Typography>
                            <Typography>
                                <Link className={classes.links} to="/">ABOUT</Link>
                            </Typography>

                            { isAuth ? (
                                <>
                                <SimpleMenu />
                                </>
                            ) : (
                            <Typography>
                                <Link className={classes.links} to="/login">LOGIN</Link>
                            </Typography>
                            )}
                        </Hidden>
                    </Toolbar>
                </AppBar>
            )}

        </AuthConsumer>
    )
};

export default withStyles(styles)(NavBar);