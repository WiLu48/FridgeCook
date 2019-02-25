import React, { Component } from 'react'
import { Paper, Grid, Typography } from '@material-ui/core'
import Axios from 'axios';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  border: {
    border: 'solid 1px black',
    width: '100%',
  },
  spacing: {
    padding: `${theme.spacing.unit * 6}px`,
  },
  img: {
    width: '100%',
  }
});


class SingleRecipe extends Component {
  state = {
    id: this.props.id,
    category: null,
    title: null,
    description: null,
    img: null,
    ingredients: [],
    steps: [],
  }


fetchAPI() {
  //FETCH RECIPE
  Axios.all([
    Axios.get("https://p4tr7k.me/Recipes.php/?id="+this.state.id),
    Axios.get("https://p4tr7k.me/Ingredients.php/?id="+this.state.id),
    Axios.get("https://p4tr7k.me/Steps.php/?id="+this.state.id)
  ])
  .then(Axios.spread((rec, ing, stp) => {
    this.setState({
      category: rec.data.Recipe_Category,
      title: rec.data.Recipe_Name,
      description: rec.data.Recipe_Description,
      img: rec.data.Recipe_Image,
      ingredients: ing.data.ingredients,
      steps: stp.data,
    })
  }))
  .catch(err => console.log("Axios err: ", err))
}

componentDidMount() {
  this.fetchAPI();
}
  render() {
    const { classes } = this.props;
    const { id, category, title, description, img, ingredients, steps} = this.state;
    return (
      <div style={{marginTop: '50px'}}>
        <Paper
        style={{width: '80%', margin: '0 auto', borderRadius: 0}}>
          <Grid container className={classes.root}>
            <Grid item md={6} sm={12} className={classes.border}>
              <div className={classes.spacing}>
                <Typography variant='h2' gutterBottom>
                {title}
                </Typography>
                <Typography variant='b1'>
                {description}
                </Typography>
              </div>
            </Grid>
            <Grid item md={6} sm={12} className={classes.border}>
              <img src={img} alt="End result of Recipe" className={classes.img}/>
            </Grid>
            <Grid item md={6} sm={12} className={classes.border}>
              <div className={classes.spacing}>
                <Typography variant='b1' gutterBottom>
                {ingredients.map(ing => {
                  return(
                  <li>{ing.Ingredient_Name} - {ing.Ingredient_Amount}</li>
                )})}
                </Typography>
              </div>
            </Grid>
            <Grid item md={6} sm={12} className={classes.border}>
              <div className={classes.spacing}>
                <ol>
                    <Typography variant='b1' gutterBottom>
                    {steps.length > 0 ? steps.map(stp => {
                      return(
                        <li>{stp.Instructions}</li>
                    )}) : null}
                    </Typography>
                </ol>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(SingleRecipe)