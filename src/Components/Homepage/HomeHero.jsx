import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withStyles, Typography, Button } from '@material-ui/core';


const styles = theme => ({
    
    imageWrapper: {
      width: '10<div>0%',
      height: '600px',
      backgroundImage: 'url(https://i.imgur.com/D5p7ZTe.jpg)',
      boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)",
      backgroundSize: 'cover',
      [theme.breakpoints.down(600 + theme.spacing.unit * 3 * 2)]: {
        height: '500px'
        },
    },
    innerWrapper: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    links: {
        color: 'white',
        textDecoration: 'none',
    }
})

class HomeHero extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.imageWrapper}>
               <div className={classes.innerWrapper}>
                    <Typography variant="h3" style={{fontWeight: 'bold'}} gutterBottom>
                        Welcome to Fridge Cook
                    </Typography>
                    <Typography variant="h4" style={{fontWeight: 'bold', marginBottom: '20px'}} gutterBottom>
                        Community driven recipes
                    </Typography>
                    <Link to="/recipes" className={classes.links}>
                        <Button color="secondary" size="large" variant="raised" style={{borderRadius: 0}}>View Recipes</Button>
                    </Link>
               </div>
            </div>
        )
    }
}

export default withStyles(styles)(HomeHero);
