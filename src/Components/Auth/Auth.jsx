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
            error: '',
            userid: '',
            firstname: '',
            lastname: '',
            created: '',
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.getEmailInput = this.getEmailInput.bind(this);
        this.getPasswordInput = this.getPasswordInput.bind(this);
    }


    componentDidMount(){
      ;       
    }

    getEmailInput(email) {
        this.setState({
          email: email,
        })
      }
    
      getPasswordInput(password) {
        this.setState({
          password: password,
        })

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
        })
      }
    
    render() {
        return (
        <AuthContext.Provider value={{
            isAuth: this.state.isAuth,
            error: this.state.error,
            login: this.login,
            logout: this.logout,
            email: this.getEmailInput,
            password: this.getPasswordInput,
            }}>
            {this.props.children}
        </AuthContext.Provider>
        )
    }
}
const AuthConsumer = AuthContext.Consumer;

export {AuthContext, AuthProvider, AuthConsumer};
