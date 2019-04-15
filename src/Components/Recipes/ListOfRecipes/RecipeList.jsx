import React, { Component } from 'react'
import Axios from 'axios';
import SingleRecipeListItem from './SingleRecipeListItem'
import { Button, Grid, Paper } from '@material-ui/core'
import RecipeFilters from './RecipeFilters';
import RecipesByIngredients from './RecipesByIngredients';

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
      ingredientName: '',
      ingredients: [],
      ingredientsExists: false,
      ingredientsVisible: false,
      isError: false,
  }
  this.loadMore = this.loadMore.bind(this);
  this.filterRecipes = this.filterRecipes.bind(this);
  this.handleAddIngredient = this.handleAddIngredient.bind(this);
  this.resetIngredients = this.resetIngredients.bind(this);
  this.removeIngredient = this.removeIngredient.bind(this);
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

  searchByIngredient(){

  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  async handleAddIngredient(){
    await this.setState({
      ingredients: [...this.state.ingredients, this.state.ingredientName],
      ingredientName: '',
      ingredientsExists: true,
    })

    this.updateRecipeList(this.state.ingredients);

    

  }

  updateRecipeList(ingredients){

    var string = ingredients.join();

    const page = "https://p4tr7k.me/API/Recipes/Search.php?Q=" + string;

    Axios.get(page)
    .then(res => {
      res.data.data ?
        this.setState({
          recipes: res.data.data,
          recipesfiltered: res.data.data,
        })
      : this.noRecipes() })
    .catch(err => {
      console.log(err)
    })
  }

  resetIngredients(){
    this.setState({
      ingredients: [],
      ingredientName: '',
      ingredientsExists: false,
    })

    this.fetchRecipes();
  }

  handleIngredientsVisibility = () => {
    var status = this.state.ingredientsVisible;
    status ? 
    this.setState({ingredientsVisible: false})
    : 
    this.setState({ingredientsVisible: true})
  }

  async removeIngredient(i) {
    await this.state.ingredients.splice(i,1);
    await this.setState({ingredients: this.state.ingredients})
    this.updateRecipeList(this.state.ingredients)
    if(this.state.ingredients.length == 0){
      this.setState({ingredientsExists: false})

    }
  }

  noRecipes = () => {
    this.setState({isError: true})
    setTimeout(() => this.setState({isError: false}), 5000);
    this.fetchRecipes();
  }

  render() {
    const { isLoading, recipes, error, limit, recipesfiltered, ingredientsVisible, isError } = this.state;
    return (
      <div style={{marginTop: '30px'}}>
      { ingredientsVisible ? 
      <RecipesByIngredients handleChange={this.handleChange} addIngredient={this.handleAddIngredient}
      ingredientsExists={this.state.ingredientsExists} ingredientName={this.state.ingredientName}
      ingredients={this.state.ingredients} reset={this.resetIngredients} hideIngredients={this.handleIngredientsVisibility} removeIngredient={this.removeIngredient} />
      : null }      
      {isError ? 
        <div style={{color: 'red', textAlign: 'center', margin: '10px', fontWeight: 'bold'}}>Unfortunately we couldn't find any Recipes with those Ingredients, displaying All Recipes</div>
         : null}
      <RecipeFilters inputRecipes={this.filterByInput.bind(this)} filterRecipes={this.filterRecipes.bind(this)} 
      showIngredients={this.handleIngredientsVisibility} ingredientsVisible={ingredientsVisible}
      />
        <Grid container
        style={{width: '70%', margin: '0 auto'}}
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
