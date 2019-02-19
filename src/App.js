import React, { Component } from 'react';
import Navbar from './Components/Layout/Navbar';
import RecipeList from './Components/Recipes/RecipeList';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <RecipeList />
      </React.Fragment>
    );
  }
}

export default App;
