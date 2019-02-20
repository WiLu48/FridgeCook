import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { Router, Route } from 'react-router'
import Navbar from './Components/Layout/Navbar';
import RecipeList from './Components/Recipes/RecipeList';
import Homepage from './Pages/Homepage';
import Recipes from './Pages/Recipes';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path='/' component={Homepage} />
        <Route path='/recipes' component={Recipes} />
      </Router>
    );
  }
}

export default App;
