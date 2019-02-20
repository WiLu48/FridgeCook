import React, { Component } from 'react'
import Axios from 'axios';
import SingleRecipe from './SingleRecipe'
import { Button, Grid, Paper } from '@material-ui/core'

export default class RecipeList extends Component {
  constructor(props) {
    super(props)
  
  this.state = {
      isLoading: null,
      recipes: [],
      error: null,
      limit: 6,
  }
  this.loadMore = this.loadMore.bind(this);
}


  loadMore() {
    this.setState((prev) => {
      return {limit: prev.limit + 3};
    });
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
    const { isLoading, recipes, error, limit } = this.state;
    return (
      <>
        <Grid container
        justify="center"
        alignItems="flex-start"
        style={{width: '70%', margin: 'auto'}}
        >
          {recipes.slice(0, limit).map(recipe =>
            <SingleRecipe
            key={recipe.Recipe_ID}
            id={recipe.Recipe_ID}
            name={recipe.Recipe_Name}
            image={recipe.Recipe_Image}
            desc={recipe.Recipe_Description}
            cat={recipe.Category_ID}
            />
            )}
        </Grid>
        <div style={{margin: '30px', textAlign: 'center'}}>
          {limit < recipes.length &&
            <Button onClick={this.loadMore} type="button">Load More</Button>}
        </div>
      </>
    )
  }
}
