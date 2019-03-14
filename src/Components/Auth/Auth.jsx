import React, { Component } from 'react'
import Axios from 'axios';

const AuthContext = React.createContext();

class AuthProvider extends Component {
    constructor(props){
        super(props)
        this.state = {
            isAuth: sessionStorage.getItem("isAuth"),
            email: '',
            password: '',
            password2: '',
            error: 'asd',
            userid: '',
            firstname: '',
            lastname: '',
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.registerUser = this.registerUser.bind(this);


    }

    displayError(){
      setTimeout(() => this.setState({error: ''}), 5000);
    }


    handleChange = event => {
      this.setState({ [event.target.name]: event.target.value })
    }

    login(e){
      e.preventDefault();
      this.authenticateUser();
    }

    logout(){
      this.setState({
        isAuth: false,
      })
      sessionStorage.removeItem('isAuth');
    }

    checkPassword(){
      if(this.state.password.length > 0 && this.state.password === this.state.password2){
        return true;
      } else {
        return false;
      }
    }

    registerUser(e) {
      e.preventDefault();
      (this.checkPassword()) ?
      console.log("YES") :
      console.log("NO")        
    }

    createUser(){

    }

    // AUTH THE USER
    authenticateUser(){
        var page = "https://www.p4tr7k.me/API/Account/Login.php";
        var post = {
          'email': this.state.email,
          'password': this.state.password,
        }
        Axios.post(page, post)
        .then(res => {
          console.log(res);
          this.setState({
            password: '',
            isAuth: true,
            error: '',
            
          })
          sessionStorage.setItem("isAuth", true);

        })
        .catch(err => {
          console.log(err.response.data);
          this.setState({
            error: err.response.data,
          })
          this.displayError();
        })
      }
    
    render() {
        return (
        <AuthContext.Provider value={{
            isAuth: this.state.isAuth,
            error: this.state.error,
            login: this.login,
            logout: this.logout,
            handleChange: this.handleChange,
            register: this.registerUser,
            }}>
            {this.props.children}
        </AuthContext.Provider>
        )
    }
}
const AuthConsumer = AuthContext.Consumer;

export {AuthContext, AuthProvider, AuthConsumer};
