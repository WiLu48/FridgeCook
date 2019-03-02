import React, { Component, useContext } from 'react'
import LoginForm from '../Components/Login/LoginForm';
import Axios from 'axios';
import {AuthContext, AuthProvider, AuthConsumer} from '../Components/Auth/Auth';


export default class LoginPage extends Component {
  static contextType = AuthContext;
  constructor(props){
    super(props);
    this.state = {
      isAuth: false,
      email: "",
      password: "",
      error: "",
    }
  }

  test() {
    console.log(this.context.isAuth);
  }

  authenticateUser(){
    var page = "https://www.p4tr7k.me/API/Account/Login.php";
    var post = {
      'email': this.state.email,
      'password': this.state.password,
    }
    Axios.post(page, post)
    .then(res => {
      this.setState({
        error: "",
        isAuth: true,
      })
      localStorage.setItem("AUTH", true);
      console.log(localStorage);
    })
    .catch(err => {
      this.setState({
        error: err.response.data,
      })
    })
  }

  changeEmailHandler(email) {
    this.setState({
      email: email,
    })
  }

  changePasswordHandler(password) {
    this.setState({
      password: password,
    })
  }

  handleSubmit(){
    this.authenticateUser();
  }

  render() {

    const {isAuth} = this.context;
    console.log(isAuth);

    return (
      <div style={{background: 'red'}}>
          <LoginForm 
          email={this.changeEmailHandler.bind(this)}
          password={this.changePasswordHandler.bind(this)}
          sbt={this.handleSubmit.bind(this)}
          />   
          {this.state.error}     
          <button onClick={this.test}>TEST</button>
      </div>
    )
  }
}
