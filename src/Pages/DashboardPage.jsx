import React, { Component } from 'react'
import { AuthContext } from '../Components/Auth/Auth';
import {withStyles, Button, Grid, Avatar, Paper, Typography, List, ListItem, ListItemAvatar, ListItemText} from '@material-ui/core'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import MyRecipesItem from '../Components/Recipes/Dashboard/MyRecipesItem';

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

  }
})

class DashboardPage extends Component {
  static contextType = AuthContext;
  state = {
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


  render() {
    const {checkAuth} = this.context;
    const {recipes} = this.state;
    const {classes} = this.props;
    checkAuth();
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Typography variant="h3">
          Welcome {sessionStorage.getItem('fname')} {sessionStorage.getItem('lname')}
          </Typography>
        </Paper>
        <Grid container justify="space-between" className={classes.btns}>
          <Grid item>
            <Link to="/dashboard/addrecipe">
            <Button variant='contained' color='default'>Add new Recipe</Button>
            </Link>
          </Grid>
          <Grid item>
            <Button variant='contained' color='default'>Add new Recipe</Button>
          </Grid>
          <Grid item>
            <Button variant='contained' color='default'>Add new Recipe</Button>
          </Grid>
          <Grid item>
            <Button variant='contained' color='default'>Add new Recipe</Button>
          </Grid>
        </Grid>
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
       
        {/* <Avatar src="http://www.p4tr7k.me/API/Recipes/Rec_Imgs/22.jpg" /> */}
      </main>
    )
  }
}

export default withStyles(styles)(DashboardPage)
