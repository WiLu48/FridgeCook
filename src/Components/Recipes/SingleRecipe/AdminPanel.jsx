import React, { Component } from 'react'
import { Paper, withStyles, Typography, Button, Grid } from '@material-ui/core';
import Axios from 'axios';
import { AuthContext } from '../../Auth/Auth';
import EditRecipeForm from '../EditRecipe/EditRecipeForm';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    background: 'lightgrey',
    [theme.breakpoints.up(1200 + theme.spacing.unit * 3 * 2)]: {
        width: '1200px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
},
    paper: {
      width: '50%',
      margin: '0 auto',
      marginTop: '30px',
      
    },
    paperWrapper: {
        padding: theme.spacing.unit,
    },
    paperAccent: {
        display: 'block',
        width: '100%',
        height: '5px',
        background: 'lightcoral'
    },
    circle: {
      width: '15px',
      height: '15px',
      borderRadius: '50%',
      verticalAlign: 'middle',
      marginLeft: '5px',
      display: 'inline-block'
    },
    btn: {
      borderRadius: 0,
      [theme.breakpoints.down("xs")]: {
        fontSize: '13px',
        padding: '7px'
      }
    }
  });
  

class AdminPanel extends Component {
  static contextType = AuthContext;
  constructor(props){
    super(props)
      this.state = {
        status: [
          'Awaiting Approval',
          'Publicly Visible'
        ],
        color: [
          'darkorange',
          'green'
        ],
        visibility: [
          'Make Public',
          'Make Private'
        ],
        confirmation: false,
        editRec: false,
      }
      this.handleButtonRemove=this.handleButtonRemove.bind(this);
      this.handleNo=this.handleNo.bind(this);
      this.handleChangeVisibilityAPI=this.handleChangeVisibilityAPI.bind(this);
      this.handleDeleteRecipeAPI=this.handleDeleteRecipeAPI.bind(this);
      this.handleEditRecipe=this.handleEditRecipe.bind(this);
      this.hideEditRecipe=this.hideEditRecipe.bind(this);
  }

    handleNo(){
      this.setState({confirmation: false})
    }

    handleButtonRemove(){
      this.setState({confirmation: true})
    }

    handleChangeVisibilityAPI(){
      const page = "https://www.p4tr7k.me/API/Recipes/Change_Visibility.php";
      const post = {
        'id': this.context.state.userid,
        'key': this.context.state.key,
        'recID': this.props.recID,
        'visible': this.props.visible,
      }

      Axios.post(page, post)
      .then(res => {
        this.props.changeState('Visible',res.data)
      })
      .catch(err => {
        console.log(err);
      })
    }

    handleDeleteRecipeAPI(){
      const page = "https://www.p4tr7k.me/API/Recipes/Delete_Recipe.php";
      const post = {
        'id': this.context.state.userid,
        'key': this.context.state.key,
        'recID': this.props.recID,
        'img': this.props.img,
      }

      Axios.post(page, post)
      .then(res => {
       this.props.changeState('redirect', true)
      })
      .catch(err => {
        console.log(err);
      })
    }

    handleEditRecipe(){
      this.setState({editRec: true});
      this.props.changeState('recExists', false)
    }

    hideEditRecipe(){
      this.setState({editRec: false})
    }





  render() {
      const { classes, visible } = this.props;
      const {status, color, confirmation, visibility, editRec} = this.state;
    return (
      <>
      <Paper square className={classes.main}>
        <span className={classes.paperAccent} />
        <div className={classes.paperWrapper}>
          <Typography variant="h5" style={{textAlign: 'center'}}>
              {this.props.isAdmin ? 'Admin Panel' : 'Author Panel'}
          </Typography>
          <Typography variant="subtitle1" style={{textAlign: 'center'}}>
              Recipe Status: <span className={classes.circle} style={{marginRight: '5px', background: color[visible]}} /> {status[visible]}
          </Typography>
          <Grid container justify="center">
            {this.props.isAdmin ? <Button className={classes.btn} onClick={this.handleChangeVisibilityAPI} style={{marginRight: '5px'}} variant="contained" color="primary">{visibility[visible]}</Button> : null}
            <Button className={classes.btn} style={{marginRight: '5px'}} onClick={this.handleEditRecipe} variant="contained" color="primary">Edit Recipe</Button>
            {confirmation ? 
            <>
            <Typography variant="subheading" style={{display: 'flex', alignItems: 'center', marginRight: '5px'}}>
              Are you sure?
            </Typography>
            <Button className={classes.btn} onClick={this.handleDeleteRecipeAPI} variant="contained" color="secondary" style={{marginRight: '5px'}} >Yes</Button>
            <Button className={classes.btn}  onClick={this.handleNo} variant="outlined" color="primary" >No</Button>
            </>
            : 
            <Button className={classes.btn}  onClick={this.handleButtonRemove} variant="contained" color="secondary" >Delete Recipe</Button>
            }
          </Grid>
        </div>
      </Paper>
      {editRec ? <EditRecipeForm hide={this.hideEditRecipe} changeState={this.props.changeState} id={this.props.recID} /> : null }
      </>
    )
  }
}

export default withStyles(styles)(AdminPanel);
