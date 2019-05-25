import React from 'react';
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, withStyles, Hidden, Grid } from '@material-ui/core'
import { AuthConsumer } from '../Auth/Auth';
import SimpleMenu from '../Utils/SimpleMenu';
import MobileMenu from '../Utils/MobileMenu';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit,
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        background: 0,
        boxShadow: 'none',
        borderBottom: 'double 5px black',
        [theme.breakpoints.up(1200 + theme.spacing.unit * 3 * 2)]: {
            width: 1200,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
      },
    toolbar: {
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        [theme.breakpoints.down(600)]: {
            justifyContent: 'flex-start'
        }
    },
    links: {
        color: 'black',
        fontWeight: 'bold',
        textDecoration: 'none',
        "&:hover": {
            color: '#B23554',
        }
    },
    logo: {
        fontFamily: 'Indie Flower, cursive', 
        fontSize: '40px',
    },
    navButtonsWrap: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    sticky: {
        background: 'white'
    }
})

function NavBar (props) {
    const {classes} = props;
    return(
        <AuthConsumer>
            {({ isAuth, logout }) => (
                <AppBar className={classes.main} position="static">
                    <Toolbar className={classes.toolbar} >
                        <Hidden smUp>
                            <Typography className={classes.logo}>
                                <Link className={classes.links} style={{color: '#B23554'}} to="/">
                                    FRIDGE COOK
                                </Link>
                            </Typography>
                            <MobileMenu isAuth={isAuth}/>
                        </Hidden>
                        <Hidden xsDown>
                            <Grid container>
                                <Grid item xs={3}>
                                    <Typography className={classes.logo}>
                                        <Link className={classes.links} style={{color: '#B23554'}} to="/">
                                            FRIDGE COOK
                                        </Link>
                                    </Typography>
                                </Grid>
                                <Grid item xs={5} className={classes.navButtonsWrap}>
                                    <Typography variant="h6">
                                        <Link className={classes.links} to="/recipes">RECIPES</Link>
                                    </Typography>
                                    <Typography variant="h6">
                                        <Link className={classes.links} to="/About">ABOUT</Link>
                                    </Typography>
                                    <Typography variant="h6">
                                        <Link className={classes.links} to="/ShoppingList">SHOPPING LIST</Link>
                                    </Typography>                                    
                                </Grid>
                                <Grid item xs={4} className={classes.navButtonsWrap} style={{justifyContent: 'flex-end'}}>
                                    { isAuth ? (
                                        <>
                                        <SimpleMenu />
                                        </>
                                    ) : (
                                    <Typography variant="h6">
                                        <Link className={classes.links} to="/login">LOGIN</Link>
                                    </Typography>
                                    )}
                                </Grid>
                            </Grid>
                            
                        </Hidden>
                    </Toolbar>
                </AppBar>
            )}

        </AuthConsumer>
    )
};

export default withStyles(styles)(NavBar);