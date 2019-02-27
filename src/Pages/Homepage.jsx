import React, { Component } from 'react'
import { TextField, MenuItem, Button } from '@material-ui/core'
import Axios from 'axios';


class Homepage extends Component {
  state = {
    response: 'before',
    error: 'error',
  }

  addUser() {
    Axios.post("https://www.p4tr7k.me/API/Account/Validate_token.php",
    {username: "testuser", password: "testpassword"})
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Homepage</h1>
        {this.state.response}
        <br />
        {this.state.error}
        <br />
        <Button onClick={this.addUser}>TEST</Button>
      </div>
    )
  }
}

export default Homepage;
