import React, { Component } from 'react'
import { Paper, withStyles, Typography, Button, Grid } from '@material-ui/core';
import Axios from 'axios';
import { AuthContext } from '../../Auth/Auth';

const styles = theme => ({
    paper: {
      width: '50%',
      margin: '0 auto',
      marginTop: '30px',
      background: 'lightgrey'
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
      }
      this.handleButtonRemove=this.handleButtonRemove.bind(this);
      this.handleNo=this.handleNo.bind(this);
      this.handleChangeVisibilityAPI=this.handleChangeVisibilityAPI.bind(this);
      this.handleDeleteRecipeAPI=this.handleDeleteRecipeAPI.bind(this);
  }

    handleNo(){
      this.setState({confirmation: false})
    }

    handleButtonRemove(){
      this.setState({confirmation: true})
    }

    handleChangeVisibilityAPI(){
      const page = "http://www.p4tr7k.me/API/Recipes/Change_Visibility.php";
      const post = {
        'id': this.context.state.userid,
        'key': this.context.state.key,
        'recID': this.props.recID,
        'visible': this.props.visible
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
      const page = "http://www.p4tr7k.me/API/Recipes/Delete_Recipe.php";
      const post = {
        'id': this.context.state.userid,
        'key': this.context.state.key,
        'recID': this.props.recID,
      }

      Axios.post(page, post)
      .then(res => {
       this.props.changeState('redirect', true)
      })
      .catch(err => {
        console.log(err);
      })
    }





  render() {
      const { classes, visible } = this.props;
      const {status, color, confirmation, visibility} = this.state;
    return (
      <Paper square className={classes.paper}>
        <span className={classes.paperAccent} />
        <div className={classes.paperWrapper}>
          <Typography variant="h5" style={{textAlign: 'center'}}>
              Admin Panel
          </Typography>
          <Typography variant="subtitle1" style={{textAlign: 'center'}}>
              Recipe Status: <span className={classes.circle} style={{marginRight: '5px', background: color[visible]}} /> {status[visible]}
          </Typography>
          <Grid container justify="center">
            <Button onClick={this.handleChangeVisibilityAPI} style={{marginRight: '5px'}} variant="contained" color="primary">{visibility[visible]}</Button>
            <Button style={{marginRight: '5px'}} variant="contained" color="primary">Edit Recipe</Button>
            {confirmation ? 
            <>
            <Typography variant="subheading" style={{display: 'flex', alignItems: 'center', marginRight: '5px'}}>
              Are you sure?
            </Typography>
            <Button onClick={this.handleDeleteRecipeAPI} variant="contained" color="secondary" style={{marginRight: '5px'}} >Yes</Button>
            <Button onClick={this.handleNo} variant="outlined" color="primary" >No</Button>
            </>
            : 
            <Button onClick={this.handleButtonRemove} variant="contained" color="secondary" >Delete Recipe</Button>
            }
          </Grid>
        </div>
      </Paper>
    )
  }
}

export default withStyles(styles)(AdminPanel);
