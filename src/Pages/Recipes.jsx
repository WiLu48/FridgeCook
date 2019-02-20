import React, { Component } from 'react'
import RecipeList from '../Components/Recipes/RecipeList';
import { Route } from 'react-router-dom'
import Homepage from './Homepage';

export default class Recipes extends Component {
  render() {
    return (    
        <div>
            <Route exact path={this.props.match.path} component={RecipeList} />
            <Route path={`${this.props.match.path}/`} component={Homepage} />
        </div>
    )
  }
}
