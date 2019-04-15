import React, { Component } from 'react'
import {withStyles,  Grid, Typography } from '@material-ui/core';
import { Face } from '@material-ui/icons';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginTop: theme.spacing.unit * 6,
    marginBottom: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1000 + theme.spacing.unit * 3 * 2)]: {
        width: 1000,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
  },
  titleBox: {
    width: '150%',
    marginTop: '5%',
    marginLeft: '-15%',
    background: '#dfdfdf',
    padding: '20px',
  }
})

class FeaturedRecipe extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.main}>
        <Grid container style={{height: '500px'}}>
          <Grid item sm={12} md={5}>
            <img style={{width: '100%'}} src="http://www.p4tr7k.me/API/Recipes/Rec_Imgs/1.jpg" alt="Fridge Logo" />
          </Grid>
          <Grid item sm={12} md={7}>
            <Grid style={{height: '100%'}} container direction="column">
              <Grid item>
                <div className={classes.titleBox}>
                  <Typography variant="h3">
                    Spaghetti Carbonara
                  </Typography>
                  <Typography variant="h6">
                    Dinner
                  </Typography>
                </div>                            
              </Grid>
              <Grid item>
                <div><Face /> 
                  <Typography variant="h6">
                    Recipe Difficulty: Easy | Author: John Smith
                  </Typography>
                </div>
              </Grid>
              <Grid item>
              CTA Button
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        
      </div>
    )
  }
}

export default withStyles(styles)(FeaturedRecipe);