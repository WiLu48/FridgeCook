import React, { Component } from 'react'
import { TextField, MenuItem, Button } from '@material-ui/core'
import Axios from 'axios';


class Homepage extends Component {
  state = {
    response: 'before',
    error: 'error',
  }

  testAPI(){
    var postData = {
      username: "test@test.com",
      password: "password"
    };
    
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    };
    
    Axios.post('https://p4tr7k.me/API/Create_User.php', postData, axiosConfig)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res);
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
  }

  fetchRecipes() {
    Axios.post("https://p4tr7k.me/API/Create_User.php",
    {"username":"User1","password":"Pass1"})
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  }
  //   Axios({
  //     method: 'post',
  //     url: 'https://p4tr7k.me/API/Create_User.php',
  //     data: {
  //       username: 'Fred',
  //       password: 'Flintstone'
  //     }
  //   });
  // }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Homepage</h1>
        {this.state.response}
        <br />
        {this.state.error}
        <br />
        <Button onClick={this.testAPI}>TEST</Button>
      </div>
    )
  }
}

export default Homepage;
