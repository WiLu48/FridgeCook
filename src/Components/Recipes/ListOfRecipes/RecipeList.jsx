import React, { Component } from 'react'
import Axios from 'axios';
import SingleRecipeListItem from './SingleRecipeListItem'
import { Button, Grid, Paper } from '@material-ui/core'
import RecipeFilters from './RecipeFilters';

export default class RecipeList extends Component {
  constructor(props) {
    super(props)
  
  this.state = {
      isLoading: null,
      recipes: [],
      error: null,
      limit: 6,
      filter: null,
      recipesfiltered: [],
      test: 1,
  }
  this.loadMore = this.loadMore.bind(this);
  this.filterRecipes = this.filterRecipes.bind(this);
}


  loadMore() {
    this.setState((prev) => {
      return {limit: prev.limit + 3};
    });
  }

  fetchRecipes() {
    Axios.get("https://p4tr7k.me/API/Recipes/Recipes.php")
    .then(response => {
      const res = response.data.data
      this.setState({
        recipes: res,
        recipesfiltered: res,
      })
    })
    .catch(error => this.state({ error, isLoading: false}));
  }
      
  componentDidMount() {
      this.fetchRecipes();
  }

  filterRecipes(filter) {
    this.setState({limit: 6})
    if (filter === '0'){
      this.setState({recipesfiltered: this.state.recipes})
    } else {
      let updatedlist = this.state.recipes.filter(recipe => {
        return recipe.Category_ID === filter;
      })
      this.setState({
        recipesfiltered: updatedlist
      })
  }}

  filterByInput(input){
    let updatedlist = this.state.recipes.filter(recipe => {
      return recipe.Recipe_Name.toLowerCase().search(
        input.toLowerCase()) !== -1;
      })

    this.setState({
      recipesfiltered: updatedlist,
    })
  }

  render() {
    const { isLoading, recipes, error, limit, recipesfiltered } = this.state;
    return (
      <div style={{marginTop: '30px'}}>
      <RecipeFilters inputRecipes={this.filterByInput.bind(this)} filterRecipes={this.filterRecipes.bind(this)} />
        <Grid container
        justify="center"
        alignItems="flex-start"
        style={{width: '70%', margin: 'auto'}}
        >
          {recipesfiltered.slice(0, limit).map(recipe =>
            <SingleRecipeListItem
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
          {limit < recipesfiltered.length &&
            <Button onClick={this.loadMore} type="button">Load More</Button>}
        </div>
      </div>
    )
  }
}
