import React, { Component } from 'react'
import Axios from 'axios';

const AuthContext = React.createContext();

class AuthProvider extends Component {
    constructor(props){
        super(props)

        this.state = {
            isAuth: localStorage.getItem("AUTH"),
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
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

    login(){
        this.setState({
            isAuth: true,
        })
    }

    logout(){
        this.setState({
            isAuth: false,
        })
    }
    
    render() {
        return (
        <AuthContext.Provider value={{
            isAuth: this.state.isAuth,
            login: this.login,
            logout: this.logout,
            }}>
            {this.props.children}
        </AuthContext.Provider>
        )
    }
}
const AuthConsumer = AuthContext.Consumer;

export {AuthContext, AuthProvider, AuthConsumer};
