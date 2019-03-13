import React, { Component } from 'react'
import LoginForm from '../Components/Login/LoginForm';
import {AuthContext} from '../Components/Auth/Auth';
import { withStyles } from '@material-ui/core';
import '../Components/Utils/transitions.css'

const styles = theme => ({
  error: {
    opacity: 0.5,
    transition: 'opacity 1s ease-in-out',  
  },
})


class LoginPage extends Component {
  static contextType = AuthContext;
  constructor(props){
    super(props);
    this.state = {
      redirect: false,
    }
  }

  render() {

    const {error} = this.context;
    const {classes} = this.props;

    return (
        <div>
          <div className={classes.error}>
            {error}
          </div>
          <LoginForm />   
          {this.state.error}     
        </div>
    )
  }
}

export default withStyles(styles)(LoginPage);
