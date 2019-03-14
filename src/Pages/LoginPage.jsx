import React, { Component } from 'react'
import LoginForm from '../Components/Login/LoginForm';
import {AuthContext} from '../Components/Auth/Auth';
import { withStyles } from '@material-ui/core';
import ErrorMsg from '../Components/Login/ErrorMsg';

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
          <ErrorMsg />
          <LoginForm />   
          {this.state.error}     
        </div>
    )
  }
}

export default withStyles(styles)(LoginPage);
