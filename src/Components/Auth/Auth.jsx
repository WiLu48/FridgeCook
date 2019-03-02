import React, { Component } from 'react'
import Axios from 'axios';

const AuthContext = React.createContext();

class AuthProvider extends Component {
    constructor(props){
        super(props)

        this.state = {
            isAuth: false,
            email: '',
            password: '',
        }
        this.login = this.login.bind(this);
        this.getEmailInput = this.getEmailInput.bind(this);
        this.getPasswordInput = this.getPasswordInput.bind(this);
    }

    login() {
        this.setState({
            isAuth: true,
        })
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

    // MAKE THIS WORK!
    // authenticateUser(){
    //     var page = "https://www.p4tr7k.me/API/Account/Login.php";
    //     var post = {
    //       'email': this.state.email,
    //       'password': this.state.password,
    //     }
    //     Axios.post(page, post)
    //     .then(res => {
    //       this.setState({
    //         error: "",
    //         isAuth: true,
    //       })
    //       localStorage.setItem("AUTH", true);
    //       console.log(localStorage);
    //     })
    //     .catch(err => {
    //       this.setState({
    //         error: err.response.data,
    //       })
    //     })
    //   }
    
    render() {
        return (
        <AuthContext.Provider value={{
            isAuth: this.state.isAuth,
            login: this.login,
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
