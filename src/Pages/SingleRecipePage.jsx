import React, { Component } from 'react'
import SingleRecipe from '../Components/Recipes/SingleRecipe/SingleRecipe';

export default class SingleRecipePage extends Component {
  render() {
    return (
      <div>
        <SingleRecipe 
        id={this.props.match.params.id} />
      </div>
    )
  }
}
