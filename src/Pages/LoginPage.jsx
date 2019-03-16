import React, { Component } from 'react'
import LoginForm from '../Components/Login/LoginForm';
import { withStyles } from '@material-ui/core';
import ErrorMsg from '../Components/Login/ErrorMsg';

const styles = theme => ({
  error: {
    opacity: 0.5,
    transition: 'opacity 1s ease-in-out',  
  },
})


class LoginPage extends Component {


  render() {

    return (
        <div>
          <ErrorMsg />
          <LoginForm />     
        </div>
    )
  }
}

export default withStyles(styles)(LoginPage);
