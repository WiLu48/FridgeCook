import React, { Component } from 'react'
import FormRecipeDetails from './FormRecipeDetails';
import FormRecipeIngredients from './FormRecipeIngredients';
import FormRecipeSteps from './FormRecipeSteps';
import Axios from 'axios';
import { AuthContext } from '../../Auth/Auth';

class EditRecipeForm extends Component {
    static contextType = AuthContext;
    constructor(props){
        super(props)

        this.state = {
            step: 1,
            recID: null,
            recLevel: "",
            recCat: "",
            recAuthor: null,
            recName: "",
            recDesc: "",
            recImg: "",
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
        this.removeImg=this.removeImg.bind(this);
        this.cancel=this.cancel.bind(this);
    }

    componentDidMount(){
        Axios.all([
            Axios.get("https://p4tr7k.me/API/Recipes/Recipes.php/?id="+this.props.id),
            Axios.get("https://p4tr7k.me/API/Recipes/Ingredients.php/?id="+this.props.id),
            Axios.get("https://p4tr7k.me/API/Recipes/Steps.php/?id="+this.props.id)
        ])
        .then(Axios.spread((rec, ing, stp) => {
            this.setState({
                recID: rec.data.Recipe_ID,
                recCat: rec.data.Category_ID,
                recLevel: rec.data.Recipe_Level,
                recName: rec.data.Recipe_Name,
                recDesc: rec.data.Recipe_Description,
                img: rec.data.Recipe_Image,
                currentIngredients: ing.data.ingredients,
                currentSteps: stp.data,
            })
            this.state.currentIngredients.length > 0 ? this.setState({isList: true, recIngredients: this.state.currentIngredients.map((data) => {return{ingredientName: data.Ingredient_Name, amount:data.Ingredient_Amount}})}) : this.setState({recIngredients: null})
            this.state.currentSteps.length > 0 ? this.setState({isListSteps: true, recSteps: this.state.currentSteps.map((data) => {return{instructions: data.Instructions}})}) : this.setState({recSteps: null})
        }))
        .catch(err => console.log("Axios err: ", err))


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
        const page = "https://www.p4tr7k.me/API/Recipes/Edit_Recipe.php";
        const config = {
            id: this.context.state.userid,
            key: this.context.state.key,
            recID: this.state.recID,
            catID: this.state.recCat,
            recLevel: this.state.recLevel,
            recName: this.state.recName,
            recDesc: this.state.recDesc,
            ingredients: this.state.recIngredients,
            instructions: this.state.recSteps,
        }

        Axios.post(page, config)
        .then(res => {
            if(this.state.recFile){
                
                var id = this.state.recID;
                const fileExtension = this.state.recFile.name.split('.').slice(1).join();
                const file = new FormData();
                file.append('recipe_image', this.state.recFile, id+"."+fileExtension);
                    
                Axios.post(page, file)
                .then(res => {
                })
                .catch(err => {
                    console.log(err);
                })
            }

            this.cancel();
            this.props.changeState('Visible', 0);
        })
        .catch(err => {
            console.log(err);
        })

    }

    removeImg(){
        this.setState({recImg: "", recFile: undefined})
    }

    cancel(){
        this.props.changeState('recExists', true);
        this.props.hide();
    }

    
  render() {
    const { step } = this.state;
    const { recID, recAuthor, recName, recDesc, recFile, img, recImg, recIngredients, recSteps, ingredient, amount, isList, isListSteps, instruction, number, recLevel, recCat } = this.state;
    const values = { recID, recAuthor, recName, recDesc, img, recFile, recImg, recIngredients, recSteps, ingredient, amount, isList, isListSteps, instruction, number, recLevel, recCat };

        // eslint-disable-next-line default-case
        switch (step) {
            case 1:
                return (
                <FormRecipeDetails
                    nextStep={this.nextStep}
                    handleChange={this.handleChange}
                    handleFile={this.handleFile}
                    values={values}
                    removeImg={this.removeImg}
                    cancel={this.cancel}
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
        }
        }
}

export default EditRecipeForm;
