import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {withStyles,  Grid, Typography, Button, Paper } from '@material-ui/core';
import Axios from 'axios';

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
    marginTop: '5%',
    padding: '20px',
  },
  links: {
    color: 'white',
    textDecoration: 'none',
  }
})

class FeaturedRecipe extends Component {
  state = {
    categoryname: {
      1: 'Breakfast',
      2: 'Dinner',
      3: 'Desert'
    },

  }

  componentDidMount(){
    this.fetchFeatured();
  }

  fetchFeatured(){
    const page = "https://p4tr7k.me/API/Recipes/Recipes.php?featured";

    Axios.get(page)
    .then(res => {
      this.setState({
        recID: res.data.Recipe_ID,
        recipeName: res.data.Recipe_Name,
        recipeDesc: res.data.Recipe_Description,
        recImg: res.data.Recipe_Image,
        recCat: res.data.Category_ID
      })
    })
    .catch(err => {
      console.log(err);
    })
  }



  render() {
    const {classes} = this.props;
    const {recID, recipeName, recipeDesc, recImg, recCat} = this.state;
    return (
      <div className={classes.main}>
      <Typography variant="caption" color="secondary" style={{fontSize: '15px', marginBottom: '5px'}}><span style={{fontWeight: 'bold'}}>FEATURED</span> RECIPE</Typography>
      <Paper square style={{background: '#fffaf0'}}>
        <Grid container style={{height: 'auto'}}>
          <Grid item sm={12} md={5}>
            {recImg ? <img style={{height: '100%', width: '100%'}} src={"https://www.p4tr7k.me/API/Recipes/Rec_Imgs/"+recImg} alt="Recipes Logo" /> : null }
          </Grid>
          <Grid item sm={12} md={7}>
            <Grid style={{height: '100%'}} container direction="column">
              <Grid item>
                <div className={classes.titleBox}>
                  <Typography variant="h3">
                    {recipeName}
                  </Typography>
                  <Typography variant="h6">
                    {this.state.categoryname[recCat]}
                  </Typography>
                </div>                            
              </Grid>
              <Grid item>
                <div style={{padding: '20px'}}>
                  <Typography variant="body1">
                    {recipeDesc}
                  </Typography>
                </div>
              </Grid>
              <Grid item style={{display: 'flex', flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <Link className={classes.links} to={"/recipes/"+recID}>
                  <Button size="large" style={{marginBottom: '20px', marginRight: '20px'}} variant="outlined" color="secondary">View Recipe</Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        </Paper>
        
      </div>
    )
  }
}

export default withStyles(styles)(FeaturedRecipe);