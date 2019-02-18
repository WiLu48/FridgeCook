import React, { Component } from 'react'
import Axios from 'axios';
import SingleRecipe from './SingleRecipe'
import { Grid, Paper } from '@material-ui/core'

export default class RecipeList extends Component {
  state = {
      isLoading: null,
      recipes: [],
      error: null,
  }

  fetchRecipes() {
    Axios.get("https://p4tr7k.me/Recipes.php")
    .then(response => {
      const res = response.data.data
      this.setState({
        recipes: res,
      })
    })
    .catch(error => this.state({ error, isLoading: false}));
  }
      
  componentDidMount() {
      this.fetchRecipes();
  }

  render() {
    const { isLoading, recipes, error } = this.state;
    return (
      <Paper>
        <Grid container>
          {recipes.map(recipe =>
            <SingleRecipe
            key={recipe.Recipe_ID}
            name={recipe.Recipe_Name}
            image={recipe.Recipe_Image}
            desc={recipe.Recipe_Description}
            cat={recipe.Category_ID}
            />
            )}
        </Grid>
      </Paper>
    )
  }
}
