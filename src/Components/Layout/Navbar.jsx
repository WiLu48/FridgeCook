import React from 'react';
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, withStyles, Hidden, Divider } from '@material-ui/core'
import { AuthConsumer } from '../Auth/Auth';
import SimpleMenu from '../Utils/SimpleMenu';
import MobileMenu from '../Utils/MobileMenu';

const styles = theme => ({
    toolbar: {
        justifyContent: 'space-evenly',
        backgroundImage: 'url(/Assets/Nav_Back.png)',
        backgroundColor: '#2d2d2d',
    },
    links: {
        color: 'white',
        textDecoration: 'none',
        "&:hover": {
            color: '#B23554',
        }
    },
    logo: {
        fontFamily: 'Indie Flower, cursive', 
        fontSize: '40px'       
    }
})

function NavBar (props) {
    const {classes} = props;
    return(
        <AuthConsumer>
            {({ isAuth, logout }) => (
                <AppBar position="static">
                    <Toolbar className={classes.toolbar} >
                        <Hidden smUp>
                            <Typography className={classes.logo}>
                                <Link className={classes.links} to="/">
                                    Fridge Cook
                                </Link>
                            </Typography>
                            <MobileMenu isAuth={isAuth}/>
                        </Hidden>
                        <Hidden xsDown>
                            <Typography variant="subtitle1">
                                <Link className={classes.links} to="/recipes">RECIPES</Link>
                            </Typography>
                            <Typography variant="subtitle1">
                                <Link className={classes.links} to="/About">ABOUT</Link>
                            </Typography>
                            <Typography className={classes.logo}>
                                <Link className={classes.links} to="/">
                                    Fridge Cook
                                </Link>
                            </Typography>
                            <Typography variant="subtitle1">
                                <Link className={classes.links} to="/ShoppingList">SHOPPING LIST</Link>
                            </Typography>

                            { isAuth ? (
                                <>
                                <SimpleMenu />
                                </>
                            ) : (
                            <Typography variant="subtitle1">
                                <Link className={classes.links} to="/login">LOGIN</Link>
                            </Typography>
                            )}
                        </Hidden>
                    </Toolbar>
                    <Divider style={{backgroundColor: 'white'}} />
                </AppBar>
            )}

        </AuthConsumer>
    )
};

export default withStyles(styles)(NavBar);