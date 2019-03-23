import React, { Component } from 'react'
import Axios from 'axios';
import AddNewRecipeForm from '../Components/Recipes/AddNewRecipe/AddNewRecipeForm';



class NewRecipePage extends Component {
    state={
        isUploaded: false,
        file: null,
    }
    // this.RecipeSubmit=this.RecipeSubmit.bind(this);

    RecipeSubmit(e){
        e.preventDefault();
        this.call()

    }

    call(){

    const fileExtension = this.state.file.name.split('.').slice(1).join();


    const data = new FormData();

    data.append('recipe_image', this.state.file, "1."+fileExtension);


    var page = "https://www.p4tr7k.me/API/Recipes/New_Recipe.php"

      Axios.post(page, data)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }

    handleFile = event => {
        this.setState({
            file: event.target.files[0],
            img: URL.createObjectURL(event.target.files[0]),
        })
    }


  render() {
    return (
        <AddNewRecipeForm />
    )
  }
}

export default NewRecipePage;