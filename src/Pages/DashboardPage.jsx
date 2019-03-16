import React, { Component } from 'react'
import { AuthContext } from '../Components/Auth/Auth';
import {Button} from '@material-ui/core'
import { Link } from 'react-router-dom';


export default class Dashboard extends Component {
  static contextType = AuthContext;
  render() {
    const {checkAuth} = this.context;
    checkAuth();
    return (
      <div>
        <Link to="/dashboard/addrecipe">
        <Button variant='contained' color='default'>Add new Recipe</Button>
        </Link>
      </div>
    )
  }
}
