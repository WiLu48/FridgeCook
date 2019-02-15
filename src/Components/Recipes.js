import React, { Component } from 'react'
import { Paper, Card, CardHeader, CardMedia, CardContent, Typography} from '@material-ui/core'




const Recipe = ({ body }) => {
  return (
    <div>
      {body.map(recipe => {
        const { Recipe_ID, Category_ID, Recipe_Name, Recipe_Description, Recipe_Image } = recipe;
        return (
          <Card 
          key={Recipe_ID}
          style={{width: '400px'}}>
          <CardHeader
            title={Recipe_Name}
          />
          <CardMedia
            style={{height: 0, paddingTop: '56.25%'}}
            image={Recipe_Image}
          />
          <CardContent>
            <Typography>
              {Recipe_Description}
            </Typography>
          </CardContent>
        </Card>
        );
      })}
    </div>
  );
};

class Recipes extends Component {
    state = {
      isLoading: true,
      recipes: [],
      error: null
    }

  fetchRecipes() {
    //fetching Recipes from the API
    fetch("https://p4tr7k.me/Recipes.php")
      .then(response => response.json())
      .then(data => 
        this.setState({
          recipes: data,
          isLoading: false,
        })
      )
      .catch(error => this.state({ error, isLoading: false}));
  }

  componentDidMount() {
    this.fetchRecipes();
  }

  render() {
    const { isLoading, recipes, error } = this.state;
    return (
      <React.Fragment>
        <Paper style={{display: "inline-flex"}}>
          {!isLoading ? Object.keys(recipes).map(key => <Recipe key={key} body={recipes[key]} />) : <h3>Loading...</h3>}
        </Paper>
      </React.Fragment>
         
    );
  }
}

export default Recipes;