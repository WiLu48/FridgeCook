import React, { Component, useContext } from 'react'
import LoginForm from '../Components/Login/LoginForm';
import Axios from 'axios';
import {AuthContext, AuthProvider, AuthConsumer} from '../Components/Auth/Auth';


export default class LoginPage extends Component {
  static contextType = AuthContext;
  constructor(props){
    super(props);
    this.state = {
      redirect: false,
    }
  }

  render() {

    const {error} = this.context;

    return (
        <div>
            {error}
            <LoginForm />   
            {this.state.error}     
        </div>
    )
  }
}
