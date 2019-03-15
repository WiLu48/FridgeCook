import React, { Component } from 'react'
import Axios from 'axios';

const AuthContext = React.createContext();

class AuthProvider extends Component {
    constructor(props){
        super(props)
        this.state = {
            isAuth: sessionStorage.getItem("isAuth"),
            password: null,
            password2: null,
            error: null,
            userid: sessionStorage.getItem("ID"),
            email: sessionStorage.getItem("email"),
            firstname: sessionStorage.getItem("fname"),
            lastname: sessionStorage.getItem("lanme"),
            admin: sessionStorage.getItem("admin"),
            key: sessionStorage.getItem("key"), 
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.authUser = this.authUser.bind(this);



    }

    displayError(){
      setTimeout(() => this.setState({error: ''}), 50000);
    }


    handleChange = event => {
      this.setState({ [event.target.name]: event.target.value })
    }

    login(e){
      e.preventDefault();
      this.loginUser();
    }

    logout(){
      this.setState({
        isAuth: null,
        email: null,
        password: null,
        password2: null,
        error: null,
        userid: null,
        firstname: null,
        lastname: null,
        key: null, 
        admin: null,
      })
      sessionStorage.clear();
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

    //CHECK IF USERS IS CORRECT
    authUser() {
      var page = "https://www.p4tr7k.me/API/Account/Auth.php"
      var post = {
        'id': this.state.userid,
        'key': this.state.key,
      };

      Axios.post(page, post)
        .then(res => {

        })
        .catch(err => {
          this.logout();
        })
    }

    // LOGIN USER
    loginUser(){
        var page = "https://www.p4tr7k.me/API/Account/Login.php";
        var post = {
          'email': this.state.email,
          'password': this.state.password,
        }
        Axios.post(page, post)
        .then(res => {
          this.setState({
            password: '',
            isAuth: true,
            error: '',
            userid: res.data.User_ID,
            email: res.data.Email,   
            firstname: res.data.Firstname,
            lastname: res.data.Lastname,
            admin: res.data.Admin,
            key: res.data.Auth_Key,
            
          })
          sessionStorage.setItem("isAuth", true);
          sessionStorage.setItem("email", this.state.email);
          sessionStorage.setItem("ID", this.state.userid);
          sessionStorage.setItem("fname", this.state.firstname);
          sessionStorage.setItem("lname", this.state.lastname);
          sessionStorage.setItem("key", this.state.key);
          sessionStorage.setItem("admin", this.state.admin);

        })
        .catch(err => {
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
            checkAuth: this.authUser,
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
