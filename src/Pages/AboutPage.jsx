import React, { Component } from 'react'
import { withStyles, Paper, Typography, Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom'


const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1200 + theme.spacing.unit * 3 * 2)]: {
            width: 1200,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginBottom: theme.spacing.unit * 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        },
    content: {
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    links: {
        color: 'white',
        textDecoration: 'none',
    },
});

class AboutPage extends Component {
  render() {
      const {classes} = this.props;
    return (
      <div className={classes.main}>
        <Paper square className={classes.paper}>
            <Grid container justify="center">
                <Grid item sm={12} md={4} style={{background: '#030f12', textAlign: 'center'}}>
                    <img style={{height: '100%', width: '100%'}} src="Assets/FC_LOGO.png" alt="FridgeCook Logo" />
                </Grid>
                <Grid item sm={12} md={8} className={classes.content}>
                    <Typography variant="h3" gutterBottom>About Us</Typography>
                    <Typography variant="body1" style={{marginBottom: '10px', fontSize: '0.9rem'}}>Initially developed as part of the Dissertation Project for Computing and Web Development Degree at Buckinghamshire New University.</Typography>
                    <Typography variant="body1" style={{marginBottom: '10px', fontSize: '0.9rem'}}>Now transitioned into a Community Driven Platform that introduces home-made recipes by breaking the process down to step-by-step instructions aimed at students to improve their ability to cook, save money and adapt healthier lifestyle.</Typography>
                    <Typography variant="body1" style={{marginBottom: '10px', fontSize: '0.9rem'}}>Feel free to take a peek at our currently available Recipes or simply contribute to the community by adding your own once you complete our Registration process.</Typography>
                    <div style={{marginTop: '25px', display: 'flex', justifyContent: 'space-around'}}>
                        <Link className={classes.links} to="/recipes"><Button color="secondary" variant="contained">All Recipes</Button></Link>
                        <Link className={classes.links} to="/register"><Button color="secondary" variant="contained">Register</Button></Link>
                    </div>
                </Grid>
            </Grid>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(AboutPage);