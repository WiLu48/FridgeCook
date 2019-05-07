import React, { Component, useContext } from 'react'
import {withStyles, Button, Grid, Avatar, Paper, Typography, FormControl, Input, InputLabel, TextField, InputAdornment, CardMedia, CardContent, Card, CardHeader, Hidden} from '@material-ui/core'
import { AuthContext } from '../../Auth/Auth';
import AccountDetailsLocked from './AccountDetailsLocked';
import AccountDetailsChange from './AccountDetailsChange';
import AccountChangePassword from './AccountChangePassword';

const styles = theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
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


class MyAccountDetails extends Component {
  static contextType = AuthContext;
  constructor(props){
    super(props)
    this.state = {
      form: 1,

    }
  }

  componentDidMount(){
    this.setState({
      fname: this.context.state.firstname,
      lname: this.context.state.lastname,
      level: this.context.state.level,
    })
  }
  
  handleChange(x){
    this.setState({form: x})
  }

  handleSlider = (event, level) => {
    this.setState({ level });
  };

  async handleSave(){
    await this.context.updateState('firstname', this.state.fname, 'fname');
    await this.context.updateState('lastname', this.state.lname, 'lname');
    await this.context.updateState('level', this.state.level, 'level');
    this.context.update();
    this.setState({form: 1})
  }


  handleCancel(){
    this.setState({
      fname: this.context.state.firstname,
      lname: this.context.state.lastname,
      level: this.context.state.level,
      form: 1,
    })
  }

  handleChangeChild = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleChangePassword(){
    this.context.changePassword();
  }

  handleAccountForm(x){
    // eslint-disable-next-line default-case
    switch(x){
      case 1:
      return(
        <>
        <AccountDetailsLocked />
        <div style={{width: '100%', display: 'flex', justifyContent: 'space-evenly', paddingTop: '10px'}}>
          <Button style={{fontSize: '0.78rem'}} variant="contained" onClick={() => this.handleChange(2)} size="small" color="primary">Edit Details</Button>
          <Button style={{fontSize: '0.78rem'}} variant="contained" onClick={() => this.handleChange(3)} size="small" color="secondary">Change Password</Button>
        </div> 
        </>
      )
      case 2:
      return(
        <>
        <AccountDetailsChange slide={this.handleSlider} change={this.handleChangeChild} fname={this.state.fname} lname={this.state.lname} level={this.state.level} />
          <div style={{width: '100%', display: 'flex', justifyContent: 'space-evenly', paddingTop: '10px'}}>
            <Button variant="contained" onClick={() => this.handleSave()} size="small" color="primary">Save</Button>
            <Button variant="contained" onClick={() => this.handleCancel()} size="small" color="secondary">Cancel</Button>
          </div> 
        </>
      )
      case 3:
      return(
        <>
        <AccountChangePassword />
        <div style={{width: '100%', display: 'flex', justifyContent: 'space-evenly', paddingTop: '10px'}}>
            <Button variant="contained" onClick={() => this.handleChangePassword()} size="small" color="primary">Change</Button>
            <Button variant="contained" onClick={() => this.handleCancel()} size="small" color="secondary">Cancel</Button>
        </div> 
        </>
      )
    }
  }

  handleLatestRecipe(x){
    // eslint-disable-next-line default-case
    switch(x){
      case 1:
      return(
        <Card square className={this.props.classes.paper} style={{padding: 0, height: '100%'}}>
          <CardContent style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative'}}>
            <Typography variant="h6">Your Latest Recipe</Typography>
            <span title={this.props.status[0]} style={{position: 'absolute', right: '30px',}}>Status:<span className={this.props.classes.circle} style={{background: this.props.status[1]}}></span> </span>
          </CardContent>
          <CardMedia alt="" style={{width: '100%', paddingTop: '35%'}} image={"https://www.p4tr7k.me/API/Recipes/Rec_Imgs/"+this.props.latestRecipe.Recipe_Image} />
          <CardContent>
              <Typography style={{textAlign: 'center', overflow: 'hidden'}} variant="h6">
              {this.props.latestRecipe.Recipe_Name}
              </Typography>
              <Typography variant="body1">
              {this.props.latestRecipe.Recipe_Description}
              </Typography>
            </CardContent>
        </Card>
      )
      case 0:
      return(
        <Paper className={this.props.classes.paper} style={{height: 'auto', padding: 20}}>
          <Typography variant="h5" >
            Your Latest Recipe
          </Typography>
          <Grid container style={{marginTop: '30px'}}>
            <Grid item xs={12} sm>
              <Typography color="secondary" variant="h6" style={{textAlign: 'center', marginTop: '30px'}}>
                IT SEEMS THAT YOU HAVEN'T ADDED ANY RECIPES YET
              </Typography>
              <div style={{textAlign: 'center', marginTop: '40px', marginBottom: '20px'}}>
                <Button onClick={(e) => this.props.handleChange(e, 3)} color="secondary" variant="contained">Contribute Now</Button>
              </div>
            </Grid>
            <Grid item xs={12} sm>            
              <img alt='' src="/Assets/CTA.png" style={{width: '100%'}}/>
            </Grid>
          </Grid>
        </Paper>
      )
    }
  }



  render() {
    const {state} = this.context;
    const {classes, latestRecipe} = this.props;
    const {form} = this.state;
    return (
      <>
      <Hidden smDown>
      <Grid container>
        <Grid item xs={12} sm>
          <Paper square className={classes.paper} style={{marginRight: '10px'}}>
            <Typography variant="h5" >
              Update Your Details
            </Typography>
            <span style={{color: 'red', textAlign: 'center'}}>{state.error}</span>
            {this.handleAccountForm(this.state.form)}
       
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
            {this.handleLatestRecipe(this.props.latestRecipeExists)}
        </Grid>  
      </Grid>
      </Hidden>
      <Hidden mdUp>
      <Grid container>
        <Grid item xs={12} sm={8}>
            {this.handleLatestRecipe(this.props.latestRecipeExists)}
        </Grid>  
        <Grid item xs={12} sm>
          <Paper square className={classes.paper} style={{marginTop: '10px', marginBottom: '10px'}}>
            <Typography variant="h5" >
              Update Your Details
            </Typography>
            <span style={{color: 'red', textAlign: 'center'}}>{state.error}</span>
            {this.handleAccountForm(this.state.form)}
        
          </Paper>
        </Grid>
      </Grid>
      </Hidden>
      </>
    )
  }
}

export default withStyles(styles)(MyAccountDetails)
