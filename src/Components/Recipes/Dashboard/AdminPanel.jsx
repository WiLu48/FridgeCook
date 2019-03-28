import React, { Component } from 'react'
import { AuthContext } from '../../Auth/Auth';
import Axios from 'axios';
import { withStyles, Paper, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, Avatar } from '@material-ui/core'


const styles = theme => ({
  paper: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 2,
    [theme.breakpoints.up(800 + theme.spacing.unit * 3 * 2)]: {
        width: 950,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
  },
})

class AdminPanel extends Component {
  static contextType = AuthContext;

  state = {
    visible: false,
    recipes: [],
  }

  async componentDidMount(){
    await this.callCheckAdminAPI();

    if(this.state.admin == 0) {
      this.props.notAdmin();
    }

    this.fetchRecipes();

  }

  fetchRecipes() {
    Axios.get("https://p4tr7k.me/API/Recipes/Recipes.php")
    .then(response => {
      const res = response.data.data
      this.setState({
        recipes: res,
      })
    })
    .catch(error => this.state({ error, isLoading: false}));
  }

  async callCheckAdminAPI(){
      var page = "https://www.p4tr7k.me/API/Account/Admin.php"
      var post = {
        'id': this.context.state.userid,
        'key': this.context.state.key,
      };

      await Axios.post(page, post)
        .then(res => {
          this.setState({
            admin: 1,
            visible: true,
          });
          this.context.updateState('admin', 1, 'admin');
        })
        .catch(err => {
          this.setState({
            admin: 0,
          });
          this.context.updateState('admin', 0, 'admin');
        })

  }



  render() {
    const {visible, recipes} = this.state;
    const {classes} = this.props;
    const img = "http://www.p4tr7k.me/API/Recipes/Rec_Imgs/" + this.props.image;
    return (
      <>
        {visible ? 
        <Paper square className={classes.paper}>
        <List>
          {recipes.map(recipe => (
            <ListItem key={recipe.Recipe_ID}>
              <ListItemAvatar>
                  <Avatar src={"http://www.p4tr7k.me/API/Recipes/Rec_Imgs/"+recipe.Recipe_Image} />
              </ListItemAvatar>
              <ListItemText primary={recipe.Recipe_Name} />
              <ListItemText secondary={recipe.Recipe_Description} />

            </ListItem>
          ))}
        </List>
        </Paper>
          



        : null } 
      </>
    )
  }
}

export default withStyles(styles)(AdminPanel);
