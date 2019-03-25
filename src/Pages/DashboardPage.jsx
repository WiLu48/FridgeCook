import React, { Component } from 'react'
import { AuthContext } from '../Components/Auth/Auth';
import {withStyles, Button, Grid, Avatar, Paper, Typography, List, ListItem, ListItemAvatar, ListItemText, Tab, Tabs} from '@material-ui/core'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import MyRecipesItem from '../Components/Recipes/Dashboard/MyRecipesItem';
import { Settings, Fastfood, AddCircle, Favorite } from '@material-ui/icons';
import AddNewRecipeForm from '../Components/Recipes/AddNewRecipe/AddNewRecipeForm';
import MyAccountDetails from '../Components/Recipes/Dashboard/MyAccountDetails';

const styles = theme => ({
  main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(800 + theme.spacing.unit * 3 * 2)]: {
          width: 1000,
          marginLeft: 'auto',
          marginRight: 'auto',
      },
  },
  paper: {
      marginTop: theme.spacing.unit * 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  btns: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    borderRadius: 0,

  }
})

function Acc (props){
  return(
    <div>
        <div><Typography variant="h6">Welcome</Typography></div>
        <div>{props.fname} {props.lname}</div> 
    </div>
  )
}

class DashboardPage extends Component {
  static contextType = AuthContext;
  state = {
    buttonPressed: 1,
    recipes: [],
  }

  componentDidMount(){
    Axios.get("https://p4tr7k.me/API/Recipes/Recipes.php?uid="+sessionStorage.getItem('ID'))
    .then(res => {
      this.setState({
        recipes: res.data.data,
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  handleChange = (event, buttonPressed) => {
    this.setState({ buttonPressed });
  };

  handleButtonDisplay(step){
    const {recipes} = this.state;
    // eslint-disable-next-line default-case
    switch(step) {
      case 1:
      return(
        <MyAccountDetails />
      );
      case 2:
      return(
        <Grid container
        justify="center">
          {recipes.map(recipe => 
            <MyRecipesItem
            key={recipe.Recipe_ID}
            id={recipe.Recipe_ID}
            name={recipe.Recipe_Name}
            image={recipe.Recipe_Image}
            desc={recipe.Recipe_Description}
            cat={recipe.Category_ID}
            />
          )}
        </Grid>
      )
      case 3:
      return(
        <AddNewRecipeForm />
      )
      case 4:
      return (
        <Typography style={{marginTop: '10px'}} variant="h6">
          Feature coming soon...
        </Typography>
      )
    }
  }


  render() {
    const {checkAuth, state} = this.context;
    const {recipes, buttonPressed} = this.state;
    const {classes} = this.props;
    checkAuth();
    return (
      <main className={classes.main}>
        <div className={classes.paper}>
        <Paper style={{width: '100%'}}>
          <Tabs
          value={buttonPressed}
          variant="fullWidth"
          textColor="secondary"
          indicatorColor="secondary"
          onChange={this.handleChange}
          >
            <Tab disabled={true} label={<Acc fname={state.firstname} lname={state.lastname} />} />
            <Tab icon={<Settings />} label="Account Settings" />
            <Tab icon={<Fastfood />} label="My Recipes" />
            <Tab icon={<AddCircle />} label="Add New Recipe" />
            <Tab icon={<Favorite />} label="Saved Recipes" />
          </Tabs>
        </Paper>
        {this.handleButtonDisplay(buttonPressed)}
        </div>       
      </main>
    )
  }
}

export default withStyles(styles)(DashboardPage)
