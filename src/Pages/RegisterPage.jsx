import React, { Component } from 'react'
import RegisterForm from '../Components/Login/RegisterForm';
import {AuthContext} from '../Components/Auth/Auth';
import ErrorMsg from '../Components/Login/ErrorMsg';



class RegisterPage extends Component {
  render() {
    return (
      <div>
        <ErrorMsg />
        <RegisterForm />        
      </div>
    )
  }
}


export default RegisterPage;
