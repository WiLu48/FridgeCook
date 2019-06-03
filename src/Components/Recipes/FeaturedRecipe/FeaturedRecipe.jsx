import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {withStyles,  Grid, Typography, Button, Paper, CardContent, CardHeader, Card, CardMedia, CardActionArea } from '@material-ui/core';
import Axios from 'axios';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginTop: theme.spacing.unit * 6,
    marginBottom: theme.spacing.unit * 3,
    [theme.breakpoints.up(1200 + theme.spacing.unit * 3 * 2)]: {
        width: 1200,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
  },
  links: {
    color: 'white',
    textDecoration: 'none',
  },
  title: {
    whiteSpace: 'nowrap',
  },
  titleBox: {
    padding: '20px',
  },
  latestRecipeCard: {
  height: '350px',
  width: '95%',
  display: 'flex',
  flexDirection: 'column',
    [theme.breakpoints.down(600)]: {
      width: '100%',
      marginBottom: '20px',
    },
  },
  featuredRecipeCard: {
    [theme.breakpoints.down(600)]: {
      background: 'white',
      marginBottom: '50px',
      textAlign: 'justify'
    }
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
    const featured = "https://p4tr7k.me/API/Recipes/Recipes.php?featured";
    const latest = "https://p4tr7k.me/API/Recipes/Recipes.php?latest";

    Axios.all([Axios.get(featured), Axios.get(latest)])
    .then(Axios.spread((featured, latest) => {
      this.setState({
        recID: featured.data.Recipe_ID,
        recipeName: featured.data.Recipe_Name,
        recipeDesc: featured.data.Recipe_Description,
        recImg: featured.data.Recipe_Image,
        recCat: featured.data.Category_ID,
        latestID: latest.data.Recipe_ID,
        latestTitle: latest.data.Recipe_Name,
        latestImg: latest.data.Recipe_Image,
      })
    }))
    .catch(err => {
      console.log(err);
    })
  }



  render() {
    const {classes} = this.props;
    const {recID, recipeName, recipeDesc, recImg, recCat, latestID, latestTitle, latestImg} = this.state;
    return (
      <div className={classes.main}>
        <Grid container style={{marginBottom: '50px'}}>
          <Grid item sm={12} md={4} style={{width: '100%'}}>
          <Typography variant="caption" color="secondary" style={{fontSize: '20px', marginBottom: '5px', textShadow: '1px 1px 1px black'}}><span style={{fontWeight: 'bold'}}>LATEST</span> RECIPE</Typography>
          <Card square
          className={classes.latestRecipeCard}
          key={latestID}
          
          >
            <Link to={"/recipes/"+latestID} className={classes.links}><CardActionArea>
              {latestImg ? 
            <CardMedia
              style={{height: 0, paddingTop: '75%'}}
              image={"https://www.p4tr7k.me/API/Recipes/Rec_Imgs/" + latestImg}
            /> : null }
            <CardHeader
            title={latestTitle}
            classes={{title: classes.title}}
            style={{marginBottom: 'auto', textAlign: 'center'}}
            />
            </CardActionArea></Link>         
          </Card>
          </Grid>
          <Grid item sm={12} md={8}>
          <Typography variant="caption" color="secondary" style={{fontSize: '20px', marginBottom: '5px', textShadow: '1px 1px 1px black'}}><span style={{fontWeight: 'bold'}}>FEATURED</span> RECIPE</Typography>
            <Paper square>
              <Grid container style={{height: '350px'}} >
                <Grid item sm={12} md={5} style={{height: '100%'}}>
                  {recImg ? <img style={{height: '100%', width: '100%'}} src={"https://www.p4tr7k.me/API/Recipes/Rec_Imgs/"+recImg} alt="Recipes Logo" /> : null }
                </Grid>
                <Grid item sm={12} md={7} className={classes.featuredRecipeCard}>
                  <Grid style={{height: '100%'}} container direction="column">
                    <Grid item>
                      <div className={classes.titleBox}>
                        <Typography variant="h4">
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
                    <Grid item style={{marginTop: 'auto'}}>
                      <Link className={classes.links} to={"/recipes/"+recID}>
                        <Button style={{borderRadius: 0, width: '100%'}} variant="contained" color="secondary">View Recipe</Button>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(FeaturedRecipe);