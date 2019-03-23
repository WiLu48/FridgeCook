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
            lastname: sessionStorage.getItem("lname"),
            admin: sessionStorage.getItem("admin"),
            key: sessionStorage.getItem("key"), 
            level: sessionStorage.getItem('level')
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
    
    registerUser(e) {
      e.preventDefault();

      if(!this.validateEmail()){
        this.setState({error: "Wrong Email"})
      } else if (this.checkPassword()){
        this.callCreateUserAPI();
      }
    }
    
    login(e){
      e.preventDefault();
      this.callLoginAPI();
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
      if(this.state.password.length < 8){
        this.setState({error: "Password needs to be at least 8 characters long"});
        return false;
      } else if (this.state.password === this.state.password2) {
        return true;
      } else {
      this.setState({error: "Password doesn't match"})        
        return false;
      }
    }

    validateEmail(){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(this.state.email).toLowerCase());
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

    callCreateUserAPI(){
      var page = "https://www.p4tr7k.me/API/Account/Create_User.php";
        var post = {
          'email': this.state.email,
          'password': this.state.password,
          'firstname': this.state.firstname,
          'lastname': this.state.lastname
        }
        var auth;
        Axios.post(page, post)
        .then(res => {
          (res.data.User_ID > 0 ? auth=true : auth=false)
          this.setState({
            password: '',
            isAuth: auth,
            error: '',
            userid: res.data.User_ID,
            email: res.data.Email,   
            firstname: res.data.Firstname,
            lastname: res.data.Lastname,
            admin: res.data.Admin,
            key: res.data.Auth_Key,
            level: res.data.Level,
            
          })
          sessionStorage.setItem("isAuth", auth);
          sessionStorage.setItem("email", this.state.email);
          sessionStorage.setItem("ID", this.state.userid);
          sessionStorage.setItem("fname", this.state.firstname);
          sessionStorage.setItem("lname", this.state.lastname);
          sessionStorage.setItem("key", this.state.key);
          sessionStorage.setItem("admin", this.state.admin);
          sessionStorage.setItem("level", this.state.level);

        })
        .catch(err => {
          this.setState({
            error: err.response.data,
          })
          this.displayError();
        })

    }


    // Call the LOGIN API to check wether the user is within the DB
    // Return USER DATA while removing password data
    callLoginAPI(){
        var page = "https://www.p4tr7k.me/API/Account/Login.php";
        var post = {
          'email': this.state.email,
          'password': this.state.password,
        }
        var auth;
        Axios.post(page, post)
        .then(res => {
          (res.data.User_ID > 0 ? auth=true : auth=false)
          this.setState({
            password: '',
            isAuth: auth,
            error: '',
            userid: res.data.User_ID,
            email: res.data.Email,   
            firstname: res.data.Firstname,
            lastname: res.data.Lastname,
            admin: res.data.Admin,
            key: res.data.Auth_Key,
            level: res.data.Level
            
          })
          sessionStorage.setItem("isAuth", auth);
          sessionStorage.setItem("email", this.state.email);
          sessionStorage.setItem("ID", this.state.userid);
          sessionStorage.setItem("fname", this.state.firstname);
          sessionStorage.setItem("lname", this.state.lastname);
          sessionStorage.setItem("key", this.state.key);
          sessionStorage.setItem("admin", this.state.admin);
          sessionStorage.setItem("level", this.state.level);

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
            state: this.state,
            }}>
            {this.props.children}
        </AuthContext.Provider>
        )
    }
}
const AuthConsumer = AuthContext.Consumer;

export {AuthContext, AuthProvider, AuthConsumer};
