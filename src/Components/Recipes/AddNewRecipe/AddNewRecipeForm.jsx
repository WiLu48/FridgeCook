import React, { Component } from 'react'
import FormRecipeDetails from './FormRecipeDetails';
import FormRecipeIngredients from './FormRecipeIngredients';

class AddNewRecipeForm extends Component {
    constructor(props){
        super(props)

        this.state = {
            step: 1,
            recID: null,
            recAuthor: null,
            recName: null,
            recDesc: null,
            recFile: null,
            recImg: null,
            recIngredients: [],
            recSteps: null,
            ingredient: "",
            amount: "",
            isList: false,
        }

        this.handleAddIngredient=this.handleAddIngredient.bind(this);
    }

    // Proceed to next step
    nextStep = () => {
        const { step } = this.state;
        this.setState({
        step: step + 1
        });
    };

    // Go back to prev step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
        step: step - 1
        });
    };

    // Handle fields change
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleFile = event => {
        this.setState({
            recFile: event.target.files[0],
            recImg: URL.createObjectURL(event.target.files[0]),
        })
    }

    handleAddIngredient(e){
        e.preventDefault();
        const newArray = {
            "ingredientName":this.state.ingredient,
            "amount":this.state.amount
        }
        this.setState({
            recIngredients: [...this.state.recIngredients, newArray],
            ingredient: "",
            amount: "",
            isList: true,
        });

    }

    
  render() {
    const { step } = this.state;
    const { recID, recAuthor, recName, recDesc, recFile, recImg, recIngredients, recSteps, ingredient, amount, isList } = this.state;
    const values = { recID, recAuthor, recName, recDesc, recFile, recImg, recIngredients, recSteps, ingredient, amount, isList };

        // eslint-disable-next-line default-case
        switch (step) {
            case 1:
                return (
                <FormRecipeDetails
                    nextStep={this.nextStep}
                    handleChange={this.handleChange}
                    handleFile={this.handleFile}
                    values={values}
                />
                );
            case 2:
                return (
                <FormRecipeIngredients
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    values={values}
                    addIng={this.handleAddIngredient}
                />
                );
            case 3:
                return (
                <h1>STEP 3</h1>
                );
            case 4:
                return (<h1>123</h1>);
        }
        }
}

export default AddNewRecipeForm;
