import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Paper, Grid, Typography, Button, Table, TableRow, TableCell, Avatar } from '@material-ui/core'
import Axios from 'axios';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit * 6,
        [theme.breakpoints.up(1200 + theme.spacing.unit * 3 * 2)]: {
            width: 1200,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    second: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit * 2,
        [theme.breakpoints.up(1200 + theme.spacing.unit * 3 * 2)]: {
            width: 1200,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        // marginTop: theme.spacing.unit * 4,
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    titleBox: {
        marginTop: '5%',
        padding: '20px',
    },
    links: {
      color: 'white',
      textDecoration: 'none',
    }
});


class SingleRecipe extends Component {
  state = {
    id: this.props.id,
    category: null,
    title: null,
    description: null,
    img: null,
    ingredients: [],
    steps: [],
    categoryname: {
        1: 'BREAKFAST',
        2: 'DINNER',
        3: 'DESERT'
      },
    showInstructions: false,
    recipeAdded: false,
    ingredientsButton: false,
        
  }


fetchAPI() {
  //FETCH RECIPE
  Axios.all([
    Axios.get("https://p4tr7k.me/API/Recipes/Recipes.php/?id="+this.state.id),
    Axios.get("https://p4tr7k.me/API/Recipes/Ingredients.php/?id="+this.state.id),
    Axios.get("https://p4tr7k.me/API/Recipes/Steps.php/?id="+this.state.id)
  ])
  .then(Axios.spread((rec, ing, stp) => {
    this.setState({
      category: rec.data.Category_ID,
      title: rec.data.Recipe_Name,
      description: rec.data.Recipe_Description,
      img: rec.data.Recipe_Image,
      ingredients: ing.data.ingredients,
      steps: stp.data,
    })
  }))
  .catch(err => console.log("Axios err: ", err))
}

addToShoppingList = () => {

  var currentList = JSON.parse(localStorage.getItem("SL"));
  var newIngredients = this.state.ingredients;
  if(currentList) {
    currentList.push(...newIngredients);
    localStorage.setItem('SL', JSON.stringify(currentList));
  } else {
    localStorage.setItem('SL', JSON.stringify(newIngredients));
  }
  this.setState({recipeAdded: true});
  setTimeout(() => {
    this.setState({ingredientsButton: true})
  }, 3000);
  

}

componentDidMount() {
  this.fetchAPI();
}
  render() {
    // var test = JSON.parse(localStorage.getItem('SL'));
    const { classes } = this.props;
    const { id, category, title, description, img, ingredients, steps} = this.state;
    const imglink = "https://www.p4tr7k.me/API/Recipes/Rec_Imgs/" + img;
    return (
        <>
        <div className={classes.main}>
        <Typography variant="caption" color="secondary" style={{fontSize: '20px', marginBottom: '5px'}}><span style={{fontWeight: 'bold'}}>{this.state.categoryname[category]}</span> RECIPE</Typography>
        <Paper square>
          <Grid container style={{height: 'auto'}}>
            <Grid item sm={12} md={6} >
              <Grid style={{height: '100%'}} container justify="space-between" direction="column">
                <Grid item>
                  <div className={classes.titleBox}>
                    <Typography variant="h3">
                      {title}
                    </Typography>
                  </div>                            
                </Grid>
                <Grid item>
                    <div style={{padding: '20px', paddingTop: 0}}>
                        <Typography variant="body1" style={{textAlign: 'justify'}}>
                            {description}
                        </Typography>
                    </div>
                </Grid>
                <Grid item>
                  <>
                  <Typography variant="h6" style={{textAlign: 'center', textDecoration: 'underline'}}>Ingredients:</Typography>
                    <Typography variant="body1">
                    <Table padding="dense">
                        {ingredients.map(ing => {
                            return(
                                <TableRow style={{height:'auto'}}>
                                    <TableCell>
                                        {ing.Ingredient_Name}
                                    </TableCell>
                                    <TableCell>
                                        {ing.Ingredient_Amount}
                                    </TableCell>
                                </TableRow>
                            )})}

                    </Table>
                    {this.state.recipeAdded ? 
                    <>
                    {this.state.ingredientsButton ? <Link to="/ShoppingList" className={classes.links}> <Button style={{width: '100%', borderRadius: 0}} variant="contained" color="secondary">Go to Shopping List</Button></Link> : 
                    <Button style={{width: '100%', borderRadius: 0}} variant="contained" disabled color="secondary"><span style={{fontWeight: 'bold', color: 'darkgrey'}} >Ingridients Added</span></Button>
                    }
                    </>
                    :
                    <Button style={{width: '100%', borderRadius: 0}} variant="contained" color="primary" onClick={this.addToShoppingList}>Add to Shopping List</Button>
                    }
                    </Typography>
                  </>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={12} md={6}>
                 <div style={{width: '100%', height: '100%', position: 'relative'}}>
                 <span style={{position: 'absolute', right: '10px', bottom: '5px'}}>
                    <Button size="large" variant="contained" color="secondary" onClick={() => this.setState(prevState => ({showInstructions: !prevState.showInstructions}))}>{this.state.showInstructions ? "Hide Instructions" : "Show Instructions"}</Button>                     
                 </span>
                <img style={{height: '100%', width: '100%'}} src={imglink} alt="Recipes Logo" />
                </div>
            </Grid>
          </Grid>
        </Paper>   
        </div>

        {this.state.showInstructions ? 
        <>
        {steps.length > 0 ? steps.map((stp, i) => {
            return(
                <div className={classes.second}> 
                <Paper >
                    <Grid container>
                        <Grid item xs={12} style={{padding: '20px'}}>
                            <Typography variant='body1' style={{display: 'inline-flex', alignItems: 'center'}}>
                                <Avatar style={{marginRight: '10px', backgroundColor: '#B23554'}}>{i+1}</Avatar>{stp.Instructions}
                            </Typography>
                        </Grid>
                  </Grid>
                </Paper>
                </div>
            )}) : null} 
            <span style={{display: 'block', height: '20px'}} />
            </> : null }


        </>
    )
  }
}

export default withStyles(styles)(SingleRecipe)