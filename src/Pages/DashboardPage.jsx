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
          width: 1200,
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

class DashboardPage extends Component {
  static contextType = AuthContext;
  state = {
    buttonPressed: 0,
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
      case 0:
      return(
        <MyAccountDetails />
      );
      case 1:
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
      case 2:
      return(
        <AddNewRecipeForm />
      )
      case 3:
      return (
        <Typography style={{marginTop: '10px'}} variant="h6">
          Feature coming soon...
        </Typography>
      )
    }
  }


  render() {
    const {checkAuth} = this.context;
    const {recipes, buttonPressed} = this.state;
    const {classes} = this.props;
    checkAuth();
    return (
      <main className={classes.main}>
        <div className={classes.paper}>
          <Typography variant="h3">
          Welcome {sessionStorage.getItem('fname')} {sessionStorage.getItem('lname')}
          </Typography>
        

        <Paper >
          <Tabs
          value={buttonPressed}
          variant="fullWidth"
          textColor="secondary"
          indicatorColor="secondary"
          onChange={this.handleChange}
          >
            <Tab icon={<Settings />} label="Account Settings" />
            <Tab icon={<Fastfood />} label="My Recipes" />
            <Tab icon={<AddCircle />} label="Add New Recipe" />
            <Tab icon={<Favorite />} label="Saved Recipes" />
          </Tabs>
        </Paper>
        {this.handleButtonDisplay(buttonPressed)}
        </div>       
        {/* <Avatar src="http://www.p4tr7k.me/API/Recipes/Rec_Imgs/22.jpg" /> */}
      </main>
    )
  }
}

export default withStyles(styles)(DashboardPage)
