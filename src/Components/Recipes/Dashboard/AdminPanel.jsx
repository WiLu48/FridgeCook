import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Auth/Auth';
import Axios from 'axios';
import { withStyles, Paper, List, ListItem, ListItemAvatar, ListItemText, Avatar, Button, Divider, Typography } from '@material-ui/core'


const styles = theme => ({
  paper: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1200 + theme.spacing.unit * 3 * 2)]: {
        width: '1200px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
  },
  btn: {
    whiteSpace: 'nowrap',
    margin: theme.spacing.unit,
  },
  circle: {
    width: '15px',
    height: '15px',
    borderRadius: '50%',
    verticalAlign: 'middle',
    marginLeft: '5px',
    display: 'inline-block'
  },
  green:{
    background: 'green',
  },
  red:{
    background: 'red',
  }
})

class AdminPanel extends Component {
  static contextType = AuthContext;

  constructor(props){
    super(props)
    this.state = {
      visible: false,
      recipes: [],
      color: [
        'darkorange',
        'green'
      ],
      status: [
        'Awaiting Approval',
        'Publicly Visible'
      ]
    }
    this.fetchRecipes=this.fetchRecipes.bind(this);
  }

  

  async componentDidMount(){
    await this.callCheckAdminAPI();

    if(this.state.admin == 0) {
      this.props.notAdmin();
    }

    await this.fetchRecipes();

  }

  async fetchRecipes() {
    const page = "https://p4tr7k.me/API/Admin/Recipes.php";
    const post = {
      'id': this.context.state.userid,
      'key': this.context.state.key,
    }
    await Axios.post(page, post)
    .then(response => {
      const res = response.data.data
      this.setState({
        recipes: res,
      })
    })
    .catch(error => {

    });
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

  test(){
    return(
      <Link to="/lol" />
    )
  }



  render() {
    const {visible, recipes} = this.state;
    const {classes} = this.props;
    const img = "https://www.p4tr7k.me/API/Recipes/Rec_Imgs/" + this.props.image;
    return (
      <>
        {visible ? 
        <Paper square className={classes.paper}>
        <div style={{paddingLeft: '10px'}}>
          <h1>Recipes Awaiting Approval</h1>
        </div>
        <Divider />
        <List>
          {recipes ? recipes.map(recipe => (
            <React.Fragment key={recipe.Recipe_ID}>
              <Link style={{textDecoration: 'none'}} to={"/recipes/"+recipe.Recipe_ID}>
              <ListItem button>
                <ListItemAvatar>
                    <Avatar style={{height: '60px', width: '60px', border: 'solid 2px '+this.state.color[recipe.Visible]}} src={"https://www.p4tr7k.me/API/Recipes/Rec_Imgs/"+recipe.Recipe_Image} />
                </ListItemAvatar>
                <ListItemText primary={
                  <>
                    <span className={classes.circle} style={{marginRight: '5px', background: this.state.color[recipe.Visible]}} />
                    <Typography component="span" variant="h6" style={{display: 'inline', verticalAlign: 'middle'}}>
                      {recipe.Recipe_Name}
                    </Typography>
                    <Typography component="span" variant="caption" style={{display: 'inline', color: this.state.color[recipe.Visible]}}>
                      <span> - </span>{this.state.status[recipe.Visible]}
                    </Typography>
                  </>
                } secondary={recipe.Recipe_Description} />

              </ListItem>
              </Link>
              <Divider />
            </React.Fragment>
          )) : "\b none"}
        </List>
        </Paper>
          



        : null } 
      </>
    )
  }
}

export default withStyles(styles)(AdminPanel);
