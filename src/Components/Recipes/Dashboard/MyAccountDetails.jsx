import React, { Component, useContext } from 'react'
import {withStyles, Button, Grid, Avatar, Paper, Typography, FormControl, Input, InputLabel, TextField, InputAdornment} from '@material-ui/core'
import { AuthContext } from '../../Auth/Auth';
import AccountDetailsLocked from './AccountDetailsLocked';
import AccountDetailsChange from './AccountDetailsChange';
import AccountChangePassword from './AccountChangePassword';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
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
          <Button variant="contained" onClick={() => this.handleChange(2)} size="small" color="primary">Edit Details</Button>
          <Button variant="contained" onClick={() => this.handleChange(3)} size="small" color="secondary">Change Password</Button>
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



  render() {
    const {state} = this.context;
    const {classes} = this.props;
    const {form} = this.state;
    return (
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
          <Paper square className={classes.paper}>
            <Typography variant="h5" >
              Your Latests Recipe
            </Typography>
          </Paper>
        </Grid>  
      </Grid>
    )
  }
}

export default withStyles(styles)(MyAccountDetails)
