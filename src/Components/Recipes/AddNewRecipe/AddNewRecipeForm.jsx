import React, { Component } from 'react'
import FormRecipeDetails from './FormRecipeDetails';
import FormRecipeIngredients from './FormRecipeIngredients';
import FormRecipeSteps from './FormRecipeSteps';
import Axios from 'axios';
import { AuthContext } from '../../Auth/Auth';

class AddNewRecipeForm extends Component {
    static contextType = AuthContext;
    constructor(props){
        super(props)

        this.state = {
            step: 1,
            recID: null,
            recLevel: "",
            recCat: "",
            recAuthor: null,
            recName: null,
            recDesc: null,
            recFile: null,
            recImg: null,
            recIngredients: [],
            recSteps: [],
            instruction: "",
            ingredient: "",
            amount: "",
            isList: false,
            isListSteps: false,
            number: 1,
        }

        this.handleAddIngredient=this.handleAddIngredient.bind(this);
        this.handleAddStep=this.handleAddStep.bind(this);
        this.submitRecipe=this.submitRecipe.bind(this);
        this.handleFile=this.handleFile.bind(this);
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
        }, () => {
            this.state.recFile ? this.setState({recImg: URL.createObjectURL(this.state.recFile)}) : this.setState({recImg: ""})
        })
    }


    handleAddIngredient(e){
        e.preventDefault();
        const ing = {
            "ingredientName":this.state.ingredient,
            "amount":this.state.amount
        }
        this.setState({
            recIngredients: [...this.state.recIngredients, ing],
            ingredient: "",
            amount: "",
            isList: true,
        });

    }

    handleAddStep(e){
        e.preventDefault();
        const stps = {
            "instructions":this.state.instruction
        }
        this.setState({
            recSteps: [...this.state.recSteps, stps],
            instruction: "",
            isListSteps: true,
        });

    }

    submitRecipe(e){
        e.preventDefault();
        const page = "https://www.p4tr7k.me/API/Recipes/New_Recipe.php";
        const config = {
            catID: this.state.recCat,
            recLevel: this.state.recLevel,
            recName: this.state.recName,
            recDesc: this.state.recDesc,
            userID: sessionStorage.getItem('ID'),
            ingredients: this.state.recIngredients,
            instructions: this.state.recSteps,
        }

        Axios.post(page, config)
        .then(res => {
            console.log(res.data);
            var id = res.data;
            const fileExtension = this.state.recFile.name.split('.').slice(1).join();
            const file = new FormData();
            file.append('recipe_image', this.state.recFile, id+"."+fileExtension);
                
            Axios.post(page, file)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
        })

    }

    
  render() {
    const { step } = this.state;
    const { recID, recAuthor, recName, recDesc, recFile, recImg, recIngredients, recSteps, ingredient, amount, isList, isListSteps, instruction, number, recLevel, recCat } = this.state;
    const values = { recID, recAuthor, recName, recDesc, recFile, recImg, recIngredients, recSteps, ingredient, amount, isList, isListSteps, instruction, number, recLevel, recCat };

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
                <FormRecipeSteps
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    values={values}
                    submit={this.submitRecipe}
                    addStep={this.handleAddStep}
                />
                );
            case 4:
                return (<h1>123</h1>);
        }
        }
}

export default AddNewRecipeForm;
